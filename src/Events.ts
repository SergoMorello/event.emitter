import type { 
	EventsObject,
	EventObject,
	EventCallback
} from "./Types";
import Event from "./Event";

/** Events class */
export default abstract class Events<T> {
	private static globalName: string = '__global';
	private static _events: EventsObject = {
		[Events.globalName]: {}
	};

	public listeners: Event<T>[];

	public events: EventObject<T>;

	/**
	 * Event constructor
	 * @param {string|boolean|undefined} group Events group name
	 */
	constructor(group?: string | boolean) {
		this.listeners = [];
		this.events = {} as EventObject<T>;

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
	public emit<EVENT extends keyof T, DATA extends T[EVENT]>(event: EVENT, data: DATA): void {
		if (!this.events[event]) return;
		for (let i = 0; i < this.events[event].length; i++) {
			this.events[event][i].emit(data);
		}
	}

	/**
	 * Add listener for event
	 * @param {EVENT} event Event name
	 * @param {DATA} callback Callback function
	 * @returns {Event<T>} Event object
	 */
	public addListener<EVENT extends keyof T, DATA extends T[EVENT]>(event: EVENT, callback: EventCallback<DATA>): Event<T, EVENT, DATA> {
		return new Event<T, EVENT, DATA>(event, callback, this);
		// return new Event<T, EVENT, DATA>(event, callback, this.events, this.listeners);
	}

	public listenerCount<EVENT extends keyof T>(event?: EVENT) {
		let count = 0;

		if (event) {
			count = this.events[event]?.length ?? 0;
		}else{
			count = this.listeners.length;
		}
		
		return count;
	}

	/**
	 * Remove listener in current event instanse
	 * @returns {void}
	 */
	public removeListener(handler: EventCallback<any>): void {
		for (let i = 0; i < this.listeners.length; i++) {
			if (this.listeners[i].hasHandler(handler)) {
				this.listeners[i].remove();
			}
		}
	}

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	public removeAllListeners(): void {
		for (let i = 0; i < this.listeners.length; i++) {
			this.listeners[i].remove();
		}
	}
}