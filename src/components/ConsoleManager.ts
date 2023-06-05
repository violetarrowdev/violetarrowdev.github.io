import Console from "./Console";

var consoleManager: ConsoleManager | null = null;

/**
 * Singleton class that handles animating console windows in the order they mount to the window.
 */
export class ConsoleManager {
    consoleQueue: Array<Console>;

    constructor(consoleQueue: Array<Console> | null = null) {
        if (consoleQueue === null) {
            this.consoleQueue = []
        } else {
            this.consoleQueue = consoleQueue
        }
    }

    static getInstance(): ConsoleManager {
        if (consoleManager === null) {
            consoleManager = new ConsoleManager();
        }
        return consoleManager;
    }

    add(newConsole: Console): void {
        this.consoleQueue.push(newConsole);
        if (this.consoleQueue.length === 1) {
            this.executeNext();
        }
    }

    clearLast(): void {
        this.consoleQueue = this.consoleQueue.slice(1);
        this.executeNext();
    }

    executeNext(): void {
        if (this.consoleQueue.length !== 0) {
            let delayInterval = 1000;
            setTimeout(() => {
                        this.consoleQueue[0].animateText();
            }, delayInterval);
        }
    }
}