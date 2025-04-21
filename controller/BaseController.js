export class BaseController {
    constructor(View){
        this.view = View;
        this.eventListeners = new Map();
        this.bindEvent(this.view.stop, "click", this.handleStop);
        this.bindEvent(this.view.cancel, "click", this.handleStop);
        this.bindEvent(this.view.rematch, "click", this.handleRematch);
        this.bindEvent(this.view.board, "click", (event) => {
            if (event.target && event.target.classList.contains("item")) {
              this.handlePlacing(event.target.id % 7);
            }
        });
    }
    bindEvent(element, event, handler) {
        const boundHandler = handler.bind(this);
        element.addEventListener(event, boundHandler);

        if (!this.eventListeners.has(element)) {
            this.eventListeners.set(element, []);
        }

        this.eventListeners.get(element).push({ event, boundHandler });
          
        return boundHandler;
    }
    async handleStart() {
        throw new Error("Must override in subclass");
    }
    handleStop() {
        throw new Error("Must override in subclass");
    }
    handlePlacing(placementLocation) {
        throw new Error("Must override in subclass");
    }
    async handleRematch() {
        throw new Error("Must override in subclass");
    }
    
    cleanup() {
        this.eventListeners.forEach((handlers, element) => {
            handlers.forEach(({ event, boundHandler }) => {
                element.removeEventListener(event, boundHandler);
            });
        });
        this.eventListeners.clear();
        this.view = null;
    }
}