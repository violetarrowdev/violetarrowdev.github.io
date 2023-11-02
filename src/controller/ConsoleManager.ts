import { Console } from '../components/Exports';
import * as Constants from '../util/Constants';

var consoleManager: ConsoleManager | null = null;

enum QueueState {
    Forward,
    Clear,
    Pause
}

// TODO: This needs to be a component to integrate properly with react router.

/**
 * Singleton class that handles animating console windows according to the order they mount to the window. 
 * Functions as a finite state machine with three modes: forward, clear, and pause.
 */
export default class ConsoleManager {

    private consoleQueue: Array<Console>;
    private queueIndex: number = 0;
    private queueState: QueueState = QueueState.Pause;
    private animationsInProgress: number = 0;
    private delayedAnim: NodeJS.Timer | null = null;
    private forceCleared: boolean = true;

    constructor(consoleQueue: Array<Console> | null = null) {
        if (consoleQueue === null) {
            this.consoleQueue = []
        } else {
            this.consoleQueue = consoleQueue
        }

        window.addEventListener(Constants.pageTransitionEvent, this.clearText.bind(this));
        setTimeout(() => this.continueText(), 1000);
    }

    static getInstance(): ConsoleManager {
        if (consoleManager === null) {
            consoleManager = new ConsoleManager();
        }
        return consoleManager;
    }

    proceed(cons: Console | null = null): void {
        
        let consoleDone: boolean = cons !== null;
        let queueSize: number = this.consoleQueue.length;
        let animCount: number = this.animationsInProgress
        let index: number = this.queueIndex

        switch (this.queueState) {

            case QueueState.Forward: {

                if (consoleDone) {
                    this.animationsInProgress--;
                    animCount--
                } 
                if (index < queueSize && animCount === 0) {
                    this.animationsInProgress++;
                    animCount++;
                    this.animateNext();
                    this.queueIndex++;
                }
                // DEBUG:
                if (index == queueSize - 1 && animCount == 0) {
                    console.log("Anims complete");
                }

                break;
            }

            case QueueState.Clear: {
                this.queueIndex = Math.min(queueSize - 1, index);
                index = this.queueIndex;
                

                if (consoleDone) {
                    this.animationsInProgress--;
                    animCount--;
                    if (index === 0) {
                        this.forceCleared = false;
                        window.dispatchEvent(new Event(Constants.consolesClearedEvent));
                        this.continueText();
                        return;
                    }
                } 
                if (queueSize > 0 && index > 0 && animCount === 0) {
                    
                    this.animationsInProgress++;
                    animCount++;
                    if (!this.consoleQueue[index].swipeText()) {
                        this.animationsInProgress--;
                        animCount--;
                    }
                    this.queueIndex--;
                    index--;
                }
                break;
            }

            case QueueState.Pause: {

                if (consoleDone) {
                    this.animationsInProgress--;
                    animCount--;
                } else if (animCount > 0) {
                    window.dispatchEvent(new Event(Constants.pauseAnimationsEvent));
                }
                break;
            }
        }

    }

    continueText(): void {
        switch (this.queueState) {
            case QueueState.Forward:
                break;
            case QueueState.Clear:
                this.pauseText();
                this.waitForAnims(QueueState.Forward);
                break;
            case QueueState.Pause:
                if (this.animationsInProgress === 0) {
                    this.queueState = QueueState.Forward;
                    this.proceed();
                } else {
                    this.waitForAnims(QueueState.Forward);
                }
                break;
        }
    }

    pauseText(): void {
        if (this.queueState === QueueState.Pause) {
            return;
        }
        this.queueState = QueueState.Pause;
        if (this.delayedAnim !== null) {
            clearTimeout(this.delayedAnim);
            this.delayedAnim = null;
            if (this.animationsInProgress > 0) { // avoids issues on forced reload or page change
                this.animationsInProgress--;
            }
            this.queueIndex--;
        }
        this.proceed()
    }

    clearText(): void {
        switch (this.queueState) {
            case QueueState.Clear:
                break;
            case QueueState.Forward:
                this.pauseText();
                this.waitForAnims(QueueState.Clear);
                break;
            case QueueState.Pause:
                if (this.animationsInProgress === 0) {
                    this.queueState = QueueState.Clear;
                    this.proceed();
                } else {
                    this.waitForAnims(QueueState.Clear);
                }
                break;
        }
    }

    add(cons: Console): number {
        let queueSize = this.consoleQueue.length;
        this.consoleQueue.push(cons);
        if (this.queueState === QueueState.Forward && this.animationsInProgress === 0) {
            this.proceed();
        }
        return queueSize
    }

    remove(idx: number) {
        this.consoleQueue.splice(idx, 1);
        for (let i = idx; i < this.consoleQueue.length; i++) {
            this.consoleQueue[i].updateLoc(-1);
        }
    }

    private waitForAnims(targetState: QueueState) {
        if (this.animationsInProgress === 0) {
            switch (targetState) {
                case QueueState.Forward:
                    this.continueText();
                    break;
                case QueueState.Clear:
                    this.clearText();
            }
        } else {
            setTimeout(() => {
                this.waitForAnims(targetState);
            }, 100)
        }
    }

    private animateNext(): void {
        if (this.queueState !== QueueState.Forward) {
            console.error("Tried to animate text while ConsoleManager is doing something else. Oops!");
        } else {
            let nextConsole: Console = this.consoleQueue[this.queueIndex];
            let animation = () => {
                if(!nextConsole.animateText()) {
                    this.animationsInProgress--;
                }
                this.delayedAnim = null;
            }
            if (nextConsole.props.noDelay) {
                animation()
            } else {
                let delayInterval = 300;
                this.delayedAnim = setTimeout(animation, delayInterval);
            }
        }
    }

    checkForceClear(): void {
        if (this.forceCleared) {
            console.log("Potential force clear detected, if this is not your first time loading the page, it may require a hard refresh (Shift-F5)")
        } else {
            this.forceCleared = true;
        }
        // this.queueIndex = 0;
        // this.animationsInProgress = 0;
        // this.queueState = QueueState.Pause;
        // this.continueText();
    }
}