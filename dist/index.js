(function webpackUniversalModuleDefinition(root, factory) {
	//Easy Event Emitter
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	//Easy Event Emitter
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	//Easy Event Emitter
	else if(typeof exports === 'object')
		exports["EventEmitter"] = factory();
	//Easy Event Emitter
	else
		root["EventEmitter"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Event.ts":
/*!**********************!*\
  !*** ./src/Event.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = Event;


/***/ }),

/***/ "./src/Events.ts":
/*!***********************!*\
  !*** ./src/Events.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Event_1 = __importDefault(__webpack_require__(/*! ./Event */ "./src/Event.ts"));
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
        this.emit = this.emit.bind(this);
        this.addListener = this.addListener.bind(this);
        this.removeAllListeners = this.removeAllListeners.bind(this);
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
     * @param {T} data Any data
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
     * @param {EventCallback} callback Callback function
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
exports["default"] = Events;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Events_1 = __importDefault(__webpack_require__(/*! ./Events */ "./src/Events.ts"));
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
exports["default"] = EventEmitter;
;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map