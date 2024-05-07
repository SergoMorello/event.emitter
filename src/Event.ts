import type {
	EventObject,
	EventCallback,
	EventHandlers
} from "./Types";

/** Event class */
export default class Event<T = any, E extends keyof T = keyof T, D extends T[E] = T[E]> {
	private events: EventObject<T>;
	private listeners: Event<T>[];
	private _name?: E;
	private handlers: EventHandlers<D>;

	/**
	 * Constructor new event
	 * @param {E} event Event name
	 * @param {EventCallback<D>} callback Callback function
	 * @param {EventObject<T>} events Static events parent
	 */
	constructor(event: E, callback: EventCallback<D>, events: EventObject<T>, listeners: Event<T>[]) {
		this.events = events;
		this.listeners = listeners;
		this._name = event;
		this.handlers = {
			callback,
			emit: [],
			remove: []
		};
		this.init();
	}

	private init() {
		if (this._name && !this.events[this._name]) {
			this.events[this._name] = [];
		}
		this.events[this._name].push(this as any);

		this.listeners.push(this as any);
	}

	/**
	 * Event name
	 * @returns {string | undefined}
	 */
	public get name(): string | undefined {
		return typeof this._name === 'string' ? this._name : undefined;
	}

	/**
	 * Emit current listener
	 * @param {D} data Data for event
	 * @returns {void}
	 */
	public emit(data: D): void {
		if (typeof this.handlers.callback !== 'function') return;
		this.handlers.callback(data);

		this.handlers.emit.forEach((handler) => handler());
	}

	/**
	 * Check has handler in the event
	 * @param {EventCallback<D>} handler Event handler
	 * @returns {boolean}
	 */
	public hasHandler(handler: EventCallback<D>): boolean {
		return handler === this.handlers.callback;
	}

	/**
	 * Remove current listener
	 * @returns {void}
	 */
	public remove(): void {
		if (!this || !this.events || !this._name || !this.events[this._name]) return;
		this.events[this._name] = this.events[this._name].filter((event) => event !== this);
		this.listeners = this.listeners.filter((listener) => listener !== this);
		this._name = undefined;
		this.handlers.callback = undefined;

		this.handlers.remove.forEach((handler) => handler());
	}

	/**
	 * Listener when event emitted
	 * @param {Function} handlerEmit
	 * @returns {void}
	 */
	public onEmit(handlerEmit: () => void): void {
		this.handlers.emit.splice(0, 1, handlerEmit);
	}

	/**
	 * Listener when event remove
	 * @param {Function} handlerRemove
	 * @returns {void}
	 */
	public onRemove(handlerRemove: () => void): void {
		this.handlers.remove.splice(0, 1, handlerRemove);
	}
}