import type {
	EventObject,
	EventCallback,
	EventHandlers
} from "./Types";

/** Event class */
export default class Event<T = any, E extends keyof T = keyof T, D extends T[E] = T[E]> {
	public readonly isStack: boolean;
	protected events: EventObject<T>;
	protected listeners: Event<T>[];
	protected _name?: E;
	private handlers: EventHandlers<D>;

	/**
	 * Constructor a new event
	 * @param {E} event Event name
	 * @param {EventCallback<D>} callback Callback function
	 * @param {EventObject<T>} events Static events parent
	 */
	constructor(event: E, callback: EventCallback<D>, events: EventObject<T>, listeners: Event<T>[], stackMode = false) {
		this.isStack = stackMode;
		this.events = events;
		this.listeners = listeners;
		this._name = event;
		this.handlers = {
			callback,
			emit: [],
			remove: []
		};
		this.push(this);
	}

	/**
	 * Push listener to the current event
	 * @param {Event<T>} eventListener
	 * @returns {void}
	 */
	protected push(eventListener: Event): void {
		if (this._name && !this.events[this._name]) {
			this.events[this._name] = [];
		}
		
		this.events[this._name].push(eventListener as any);

		this.listeners.push(eventListener as any);
	}

	/**
	 * Event name
	 * @returns {string | undefined}
	 */
	public get name(): string | undefined {
		return typeof this._name === 'string' ? this._name : undefined;
	}

	/**
	 * Emit the current listener
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
	 * Remove the current listener
	 * @returns {void}
	 */
	public remove(): void {
		if (!this || !this.events || !this._name || !this.events[this._name]) return;
		this.events[this._name] = this.events[this._name].filter((event) => event !== this);
		this.listeners = this.listeners.filter((listener) => listener !== this);

		if (!this.isStack) {
			this._name = undefined;
			this.handlers.callback = undefined;
		}

		this.handlers.remove.forEach((handler) => handler());
	}

	/**
	 * Listener when the event is emitted
	 * @param {Function} handlerEmit
	 * @returns {void}
	 */
	public onEmit(handlerEmit: () => void): void {
		this.handlers.emit.splice(0, 1, handlerEmit);
	}

	/**
	 * Listener when the event is removed
	 * @param {Function} handlerRemove
	 * @returns {void}
	 */
	public onRemove(handlerRemove: () => void): void {
		this.handlers.remove.splice(0, 1, handlerRemove);
	}
}