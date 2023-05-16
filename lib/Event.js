"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Event class */
class Event {
    /**
     * Constructor new event
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @param {EventObject} events Static events parent
     */
    constructor(event, callback, events) {
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
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
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.events = events;
        this.name = event;
        this.callback = callback;
        this.index = this.createIndex(event);
    }
    /**
     * Create instanse index
     * @param {string} event Event name
     * @returns {number} new index
     */
    createIndex(event) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        return this.events[event].push(this) - 1;
    }
    /**
     * Emit current listener
     * @param {any} data Data for event
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
        this.events[this.name].splice(this.index, 1);
    }
}
exports.default = Event;
