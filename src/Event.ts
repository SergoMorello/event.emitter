import { 
	Event as EventInt,
	EventObject
} from "./Types";

/** Event class */
export default class Event implements EventInt {
	private events: EventObject;
	private name: string;
	private callback: Function;
	private index: number;

	/**
	 * Constructor new event
	 * @param {string} event Event name
	 * @param {Function} callback Callback function
	 * @param {EventObject} events Static events parent
	 */
	constructor(event: string, callback: Function, events: EventObject) {
		this.events = events;
		this.name = event;
		this.callback = callback;
		this.index = this.createIndex(event);
	}

	/**
	 * Create instanse index
	 * @param {string} event Event name
	 * @returns {number} new index
	 */
	private createIndex(event: string): number {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		return this.events[event].push(this) - 1;
	}

	/**
	 * Emit current listener
	 * @param {any} data Data for event
	 * @returns {void}
	 */
	public emit(data: any): void {
		this.callback(data);
	}

	/**
	 * Remove current listener
	 * @returns {void}
	 */
	public remove(): void {
		this.events[this.name].splice(this.index, 1);
	}
}