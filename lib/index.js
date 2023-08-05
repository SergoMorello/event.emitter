"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = __importDefault(require("./Events"));
/** Easy Event Emitter */
class EventEmitter extends Events_1.default {
}
_a = EventEmitter;
Object.defineProperty(EventEmitter, "instance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new EventEmitter(true)
});
/**
 * Event emitter
 * @param {string} event Event name
 * @param {any} data Any data
 * @returns {void}
 */
Object.defineProperty(EventEmitter, "emit", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: _a.instance.emit
});
/**
 * Add listener for event
 * @param {string} event Event name
 * @param {EventCallback} callback Callback function
 * @returns {Event} {remove: Function, emit: Function}
 */
Object.defineProperty(EventEmitter, "addListener", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: _a.instance.addListener
});
/**
 * Remove all listeners in current event instanse
 * @returns {void}
 */
Object.defineProperty(EventEmitter, "removeAllListeners", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: _a.instance.removeAllListeners
});
exports.default = EventEmitter;
;
