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
	static emit(event, data) {
		return this.#instance.emit(event, data);
	}

	/**
	 * Add listener for event
	 * @param {String} event Event name
	 * @param {Function} callback Callback function
	 * @returns {Object} {remove: Function}
	 */
	static addListener(event, callback) {
		return this.#instance.addListener(event, callback);
	}

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	static removeAllListeners() {
		return this.#instance.removeAllListeners();
	}
};