var consoleManager = null;

export class ConsoleManager {

    constructor(consoleQueue = null) {
        if (consoleQueue === null) {
            this.consoleQueue = []
        } else {
            this.consoleQueue = consoleQueue
        }
    }

    static getInstance() {
        if (consoleManager === null) {
            consoleManager = new ConsoleManager();
            console.log("Instance created");
        }
        console.log("Instance retrieved");
        return consoleManager;
    }

    add(newConsole) {
        this.consoleQueue.push(newConsole);
        console.log("Added console!")
        console.log(this.consoleQueue);
        if (this.consoleQueue.length == 1) {
            this.executeNext();
        }
    }

    clearLast() {
        this.consoleQueue = this.consoleQueue.slice(1);
        console.log("Cleared previous console");
        this.executeNext();
    }

    executeNext() {
        if (this.consoleQueue.length != 0) {
            let delayInterval = 1000;
            setTimeout(() => {
                        this.consoleQueue[0].animateText();
            }, delayInterval);
        }
    }
}