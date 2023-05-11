import {
	EventsContainer,
	Events,
	Callback,
	Listener
} from "./Types";

class Core {
	static #events: EventsContainer = {
		__groups: {},
		__global: {}
	}

	private events: Events;

	/**
	 * Event instanse
	 * @param {string|boolean|undefined} name Name event group
	 */
	constructor(name?: string | boolean | undefined) {
		this.events = {};

		if (typeof name === 'boolean' && name === true) {
			this.events = Core.#events.__global;
		}else{
			if (typeof name === 'string') {
				if (!Core.#events.__groups[name]) {
					Core.#events.__groups[name] = [];
				}
				this.events = Core.#events.__groups[name];
			}
		}
	}

	/**
	 * Event emitter
	 * @param {string} event Event name
	 * @param {any} data Any data
	 * @returns {void}
	 */
	public emit(event: string, data: any): void {
		if (!this.events[event])
			return;
		Object(this.events[event]).forEach((callback: Function) => callback(data));
	}

	/**
	 * Add listener for event
	 * @param {string} event Event name
	 * @param {function} callback Callback function
	 * @returns {Listener} {remove: Function}
	 */
	public addListener(event: string, callback: Callback): Listener {
		if (!(event in this.events))
			this.events[event] = [];

		const indexEvent = this.events[event].push(callback) - 1;
		return <Listener>{
			remove: () => {
				this.events[event].splice(indexEvent, 1);
			}
		}
	}

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	public removeAllListeners(): void {
		this.events = {};
	}
}
export default Core;