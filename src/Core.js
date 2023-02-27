class Core {
	static #events = {
		__groups: {},
		__global: {}
	}

	/**
	 * Event instanse
	 * @param {String|Boolean|null} name Name event group
	 */
	constructor(name) {
		this.events = {};

		if (typeof name === 'boolean' && name === true) {
			this.events = Core.#events.__global;
		}else{
			if (name) {
				if (typeof Core.#events.__groups[name] === 'undefined') {
					Core.#events.__groups[name] = {};
				}
				this.events = Core.#events.__groups[name];
			}
		}
	}

	/**
	 * Event emitter
	 * @param {String} event Event name
	 * @param {any} data Any data
	 * @returns {void}
	 */
	emit(event, data) {
		if (!this.events[event])
			return;
		this.events[event].forEach(callback => callback(data));
	}

	/**
	 * Add listener for event
	 * @param {String} event Event name
	 * @param {Function} callback Callback function
	 * @returns {Object} {remove: Function}
	 */
	addListener(event, callback) {
		if (!this.events[event])
			this.events[event] = [];

		const indexEvent = this.events[event].push(callback) - 1;
		return {
			remove: () => {
				this.events[event].splice(indexEvent, 1);
			}
		}
	}

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	removeAllListeners() {
		this.events = {};
	}
}
export default Core;