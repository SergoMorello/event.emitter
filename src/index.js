import Core from "./Core";

/** Easy Event Emitter */
export default class EventEmitter extends Core {
	static #instance = new EventEmitter(true);

	/**
	 * Event emitter
	 * @param {String} event Event name
	 * @param {any} data Any data
	 * @returns {void}
	 */
	static emit(...args) {
		return this.#instance.emit(...args);
	}

	/**
	 * Add listener for event
	 * @param {String} event Event name
	 * @param {Function} callback Callback function
	 * @returns {Object} {remove: Function}
	 */
	static addListener(...args) {
		return this.#instance.addListener(...args);
	}

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	static removeAllListeners(...args) {
		return this.#instance.removeAllListeners(...args);
	}
};