class EventEmitter {
	static #events = {
		__groups: {},
		__global: {}
	}

	constructor(name) {
		this.events = {};
		
		if (typeof name === 'boolean' && name === true) {
			this.events = EventEmitter.#events.__global;
		}
		if (name) {
			if (typeof EventEmitter.#events.__groups[name] === 'undefined') {
				EventEmitter.#events.__groups[name] = {};
			}
			this.events = name ? EventEmitter.#events.__groups[name] : {};
		}
	}

	static emit(...args) {
		return (new EventEmitter(true)).emit(...args);
	}

	static addListener(...args) {
		return (new EventEmitter(true)).emit(...args);
	}

	static removeAllListeners(...args) {
		return (new EventEmitter(true)).emit(...args);
	}

	emit(event, data) {
		if (!this.events[event])
			return;
		this.events[event].forEach(callback => callback(data));
	}

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

	removeAllListeners() {
		this.events = {};
	}
}
export default EventEmitter;