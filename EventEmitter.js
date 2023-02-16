class EventEmitter {
	static #events = {
		__groups: {},
		__global: {}
	}

	constructor(name) {
		this.events = {};

		if (typeof name === 'boolean' && name === true) {
			this.events = EventEmitter.#events.__global;
		}else{
			if (name) {
				if (typeof EventEmitter.#events.__groups[name] === 'undefined') {
					EventEmitter.#events.__groups[name] = {};
				}
				this.events = EventEmitter.#events.__groups[name];
			}
		}
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