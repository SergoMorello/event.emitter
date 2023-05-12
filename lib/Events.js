"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("./Event"));
/** Events class */
class Events {
    /**
     * Event constructor
     * @param {string|boolean|undefined} group Events group name
     */
    constructor(group) {
        Object.defineProperty(this, "listeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.listeners = [];
        this.events = {};
        if (typeof group === 'boolean' && group === true) {
            this.events = Events.events[Events.globalName];
        }
        else {
            if (typeof group === 'string' && group !== Events.globalName) {
                if (!Events.events[group]) {
                    Events.events[group] = {};
                }
                this.events = Events.events[group];
            }
        }
    }
    /**
     * Event emitter
     * @param {string} event Event name
     * @param {any} data Any data
     * @returns {void}
     */
    emit(event, data) {
        if (!this.events[event]) {
            return;
        }
        this.events[event].forEach((event) => {
            event.emit(data);
        });
    }
    /**
     * Add listener for event
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {Event} {remove: Function, emit: Function}
     */
    addListener(event, callback) {
        const newListener = new Event_1.default(event, callback, this.events);
        this.listeners.push(newListener);
        return newListener;
    }
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    removeAllListeners() {
        this.listeners.reverse().forEach((listener) => {
            listener.remove();
        });
    }
}
Object.defineProperty(Events, "globalName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: '__global'
});
Object.defineProperty(Events, "events", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        [Events.globalName]: {}
    }
});
exports.default = Events;
