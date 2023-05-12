import { 
	EventsObject,
	EventObject,
	Events as EventsInt
} from "./Types";
import Event from "./Event";

/** Events class */
export default class Events implements EventsInt {
	private static globalName: string = '__global';
	private static events: EventsObject = {
		[Events.globalName]: <EventObject>{}
	};

	private listeners: Array<Event>;

	private events: EventObject;

	/**
	 * Event constructor
	 * @param {string|boolean|undefined} group Events group name
	 */
	constructor(group?: string | boolean | undefined) {
		this.listeners = [];
		this.events = {};

		if (typeof group === 'boolean' && group === true) {
			this.events = Events.events[Events.globalName];
		}else{
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
	 * @param {any} data Any data
	 * @returns {void}
	 */
	public emit(event: string, data: any): void {
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
	 * @param {Function} callback Callback function
	 * @returns {Event} {remove: Function, emit: Function}
	 */
	public addListener(event: string, callback: Function): Event {
		const newListener = new Event(event, callback, this.events);
		this.listeners.push(newListener);
		return newListener;
	}

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	public removeAllListeners(): void {
		this.listeners.reverse().forEach((listener) => {
			listener.remove();
		});
	}
}