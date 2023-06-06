import Console from './Console';
import * as Events from './Events';

var consoleManager: ConsoleManager | null = null;
var debugVal: number = 0;

enum QueueState {
    Forward,
    Clear,
    Pause
}

/**
 * Singleton class that handles animating console windows according to the order they mount to the window. 
 * Functions as a finite state machine with three modes: forward, clear, and pause.
 */
export default class ConsoleManager {
    private consoleQueue: Array<Console>;
    private queueIndex: number = 0;
    private queueState: QueueState = QueueState.Forward;
    private animationsInProgress: number = 0;
    private delayedAnim: NodeJS.Timer | null = null;

    constructor(consoleQueue: Array<Console> | null = null) {
        if (consoleQueue === null) {
            this.consoleQueue = []
        } else {
            this.consoleQueue = consoleQueue
        }

        window.addEventListener(Events.pageTransitionEvent, this.clearText.bind(this));
    }

    static getInstance(): ConsoleManager {
        if (consoleManager === null) {
            consoleManager = new ConsoleManager();
        }
        return consoleManager;
    }

    proceed(cons: Console | null = null): void {
        
        let intDebugVal: number = debugVal++;
        console.log("Op" + intDebugVal + " - Start index: " + this.queueIndex);
        let consoleDone: boolean = cons !== null;
        // console.log("Completed animation: " + consoleDone);
        let queueSize: number = this.consoleQueue.length;
        let animCount: number = this.animationsInProgress
        console.log("Op" + intDebugVal + " - Start anim count: " + animCount);
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
                break;
            }

            case QueueState.Clear: {
                this.queueIndex = Math.min(queueSize - 1, index);
                index = this.queueIndex;
                

                if (consoleDone) {
                    // console.log("Animations remaining: " + animCount)
                    this.animationsInProgress--;
                    animCount--;
                    if (index === 0) {
                        console.log("Console cleared event!!!")
                        window.dispatchEvent(new Event(Events.consolesClearedEvent));
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
                    console.log("Dispatching pause event");
                    window.dispatchEvent(new Event(Events.pauseAnimationsEvent));
                }
                break;
            }
        }

        console.log("Op" + intDebugVal + " - End index: " + this.queueIndex);
        console.log("Op" + intDebugVal + " - End anim count: " + animCount);
        console.log("Op" + intDebugVal + " - Console done: " + consoleDone);
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
        // console.log("Entering pause mode.");
        // let adjustIndex: boolean = this.queueState === QueueState.Forward;
        this.queueState = QueueState.Pause;
        if (this.delayedAnim !== null) {
            clearTimeout(this.delayedAnim);
            this.delayedAnim = null;
            this.animationsInProgress--;
            this.queueIndex--;
        }
        this.proceed()
        // if (adjustIndex && this.animationsInProgress > 0) {
        //     this.queueIndex--;
        // }
    }

    clearText(): void {
        // console.log("Initial call to clearText().");
        // console.log(this.consoleQueue);
        switch (this.queueState) {
            case QueueState.Clear:
                break;
            case QueueState.Forward:
                this.pauseText();
                console.log("Text scrolling successfully paused.")
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
                    console.log("Anims complete, switching to text clear mode.")
                    this.clearText();
            }
        } else {
            console.log("Waiting for no anims to progress... Anims left: " + this.animationsInProgress)
            setTimeout(() => {
                this.waitForAnims(targetState);
            }, 100)
        }
    }

    private animateNext(): void {
        if (this.queueState !== QueueState.Forward) {
            console.error("Tried to animate text while ConsoleManager is doing something else. Oops!");
        } else {
            let delayInterval = 300;
            let nextConsole: Console = this.consoleQueue[this.queueIndex];
            this.delayedAnim = setTimeout(() => {
                        if(!nextConsole.animateText()) {
                            this.animationsInProgress--;
                        }
                        this.delayedAnim = null;
            }, delayInterval);
        }
    }
}