import type { 
	EventsObject,
	EventObject,
	EventCallback
} from "./Types";
import Event from "./Event";
import Core from "./Core";

/** Events class */
export default abstract class Events<T> extends Core<T> {
	private static globalName: string = '__global';
	private static _events: EventsObject = {
		[Events.globalName]: {}
	};

	

	/**
	 * Event constructor
	 * @param {string|boolean|undefined} group Events group name
	 */
	constructor(group?: string | boolean) {
		super();

		this.emit = this.emit.bind(this);
		this.addListener = this.addListener.bind(this);
		this.removeAllListeners = this.removeAllListeners.bind(this);

		if (typeof group === 'boolean' && group === true) {
			this.events = Events._events[Events.globalName];
		}else{
			if (typeof group === 'string' && group !== Events.globalName) {
				if (!Events._events[group]) {
					Events._events[group] = {};
				}
				this.events = Events._events[group];
			}
		}
	}

	/**
	 * Event emitter
	 * @param {EVENT} event Event name
	 * @param {DATA} data Any data
	 * @returns {void}
	 */
	public emit<DATA extends T[EVENT], EVENT extends keyof T = keyof T>(event: EVENT, data: DATA): void {
		if (!this.events[event]) return;
		this.events[event].forEach((event) => event.emit(data));
	}

	/**
	 * Add listener for event
	 * @param {EVENT} event Event name
	 * @param {DATA} callback Callback function
	 * @returns {Event<T>} Event object
	 */
	public addListener<DATA extends T[EVENT], EVENT extends keyof T = keyof T>(event: EVENT, callback: EventCallback<DATA>): Event<T, EVENT, DATA> {
		return new Event<T, EVENT, DATA>(event, callback, this);
	}

	public listenerCount<EVENT extends keyof T>(event?: EVENT) {
		let count = 0;

		if (event) {
			count = this.events[event]?.size ?? 0;
		}else{
			count = this.listeners.size;
		}
		
		return count;
	}

	/**
	 * Remove listener in current event instanse
	 * @returns {void}
	 */
	public removeListener(handler: EventCallback<any>): void {
		this.listeners.get(handler)?.remove();
	}

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	public removeAllListeners(): void {
		this.listeners.forEach((listener) => {
			listener.remove();
		});
	}
}