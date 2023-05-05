"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("./Core"));
/** Easy Event Emitter */
class EventEmitter extends Core_1.default {
    /**
     * Event emitter
     * @param {string} event Event name
     * @param {any} data Any data
     * @returns {void}
     */
    static emit(event, data) {
        return this.instance.emit(event, data);
    }
    /**
     * Add listener for event
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {Object} {remove: Function}
     */
    static addListener(event, callback) {
        return this.instance.addListener(event, callback);
    }
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    static removeAllListeners() {
        return this.instance.removeAllListeners();
    }
}
Object.defineProperty(EventEmitter, "instance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new EventEmitter(true)
});
exports.default = EventEmitter;
;
