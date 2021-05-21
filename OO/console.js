class ConsoleWrapper {

    constructor() {
        this.documentReady = false;
        this.documentBuffer = [ ];

        document.addEventListener("DOMContentLoaded", () => {
            this.documentReady = true;
            this.flush();
        })
    }

    flush() {
        const entries = this.documentBuffer;
        this.documentBuffer = [ ];

        for (const entry of entries) {
            this.log(entry.message, entry.target);
        }
    }

    log(message, target) {
        if (!this.documentReady) {
            this.documentBuffer.push({message, target})
        } else {
            document.body.innerHTML += `<p>${target || ''}<pre>${message}</pre></p><hr>`;
        }
    }

    wrap(logObject) {
        logObject.log = (message, target) => this.log(message, target);
    }
}

ConsoleWrapper.default = new ConsoleWrapper();
ConsoleWrapper.default.wrap(console);
