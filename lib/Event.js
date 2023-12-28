"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Event class */
class Event {
    /**
     * Constructor new event
     * @param {string} event Event name
     * @param {EventCallback} callback Callback function
     * @param {EventObject} events Static events parent
     */
    constructor(event, callback, events) {
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "callback", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.events = events;
        this._name = event;
        this.callback = callback;
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(this);
    }
    /**
     * Event name
     * @returns {string}
     */
    get name() {
        return this._name;
    }
    /**
     * Emit current listener
     * @param {T} data Data for event
     * @returns {void}
     */
    emit(data) {
        this.callback(data);
    }
    /**
     * Remove current listener
     * @returns {void}
     */
    remove() {
        if (!this.events[this.name])
            return;
        this.events[this.name] = this.events[this.name].filter((event) => event !== this);
        this._name = '';
        this.callback = () => { };
    }
}
exports.default = Event;
