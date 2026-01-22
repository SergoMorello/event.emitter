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

	/**
	 * Subscribes to an event and registers a persistent listener.
	 *
	 * The callback will be invoked every time the specified event is emitted
	 * until the returned listener is explicitly removed.
	 *
	 * @typeParam EVENT - Event name from the event map.
	 * @typeParam DATA - Payload type associated with the event.
	 *
	 * @param event - The event name to subscribe to.
	 * @param callback - Function invoked when the event is emitted.
	 *
	 * @returns An {@link Event} instance that can be used to manage
	 *          the listener lifecycle (e.g. remove the listener).
	 */
	public on<DATA extends T[EVENT], EVENT extends keyof T = keyof T>(event: EVENT, callback: EventCallback<DATA>): Event<T, EVENT, DATA> {
		return this.addListener(event, callback);
	}

	/**
	 * Subscribes to an event and registers a one-time listener.
	 *
	 * The callback will be invoked only once — on the next emission
	 * of the specified event — and the listener will be automatically
	 * removed immediately after invocation.
	 *
	 * @typeParam EVENT - Event name from the event map.
	 * @typeParam DATA - Payload type associated with the event.
	 *
	 * @param event - The event name to subscribe to.
	 * @param callback - Function invoked once when the event is emitted.
	 *
	 * @returns An {@link Event} instance representing the one-time listener.
	 */
	public once<DATA extends T[EVENT], EVENT extends keyof T = keyof T>(event: EVENT, callback: EventCallback<DATA>): Event<T, EVENT, DATA> {
		const currentEvent = new Event<T, EVENT, DATA>(event, (e) => {
			callback(e);
			currentEvent.remove();
		}, this);
		return currentEvent;
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