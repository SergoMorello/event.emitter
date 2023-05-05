"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Core_events;
Object.defineProperty(exports, "__esModule", { value: true });
class Core {
    /**
     * Event instanse
     * @param {string|boolean|undefined} name Name event group
     */
    constructor(name) {
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.events = {};
        if (typeof name === 'boolean' && name === true) {
            this.events = __classPrivateFieldGet(Core, _a, "f", _Core_events).__global;
        }
        else {
            if (typeof name === 'string') {
                if (!__classPrivateFieldGet(Core, _a, "f", _Core_events).__groups[name]) {
                    __classPrivateFieldGet(Core, _a, "f", _Core_events).__groups[name] = [];
                }
                this.events = __classPrivateFieldGet(Core, _a, "f", _Core_events).__groups[name];
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
        if (!this.events[event])
            return;
        Object(this.events[event]).forEach((callback) => callback(data));
    }
    /**
     * Add listener for event
     * @param {string} event Event name
     * @param {function} callback Callback function
     * @returns {Object} {remove: Function}
     */
    addListener(event, callback) {
        if (!(event in this.events))
            this.events[event] = [];
        const indexEvent = this.events[event].push(callback) - 1;
        return {
            remove: () => {
                this.events[event].splice(indexEvent, 1);
            }
        };
    }
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    removeAllListeners() {
        this.events = {};
    }
}
_a = Core;
_Core_events = { value: {
        __groups: {},
        __global: {}
    } };
exports.default = Core;
