import { 
	Event as EventInt,
	EventObject,
	EventCallback
} from "./Types";

/** Event class */
export default class Event<T> implements EventInt {
	private events: EventObject;
	private _name: string;
	private callback: EventCallback<T>;

	/**
	 * Constructor new event
	 * @param {string} event Event name
	 * @param {EventCallback} callback Callback function
	 * @param {EventObject} events Static events parent
	 */
	constructor(event: string, callback: EventCallback<T>, events: EventObject) {
		this.events = events;
		this._name = event;
		this.callback = callback;
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(this);
	}

	/**
	 * Event name
	 * @returns {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Emit current listener
	 * @param {T} data Data for event
	 * @returns {void}
	 */
	public emit(data: T): void {
		this.callback(data);
	}

	/**
	 * Remove current listener
	 * @returns {void}
	 */
	public remove(): void {
		if (!this.events[this.name]) return;
		this.events[this.name] = this.events[this.name].filter((event) => event !== this);
		this._name = '';
		this.callback = () => {};
	}
}