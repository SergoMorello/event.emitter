import type Events from "./Events";
import type {
	EventObject,
	EventCallback,
	EventHandlers
} from "./Types";

/** Event class */
export default class Event<T = any, E extends keyof T = keyof T, D extends T[E] = T[E]> {
	public readonly isStack: boolean;
	protected _name?: E;
	private handlers: EventHandlers<D>;

	/**
	 * Constructor a new event
	 * @param {E} event Event name
	 * @param {EventCallback<D>} callback Callback function
	 * @param {EventObject<T>} events Static events parent
	 */
	constructor(event: E, callback: EventCallback<D>, protected context: Events<T>, stackMode = false) {
		this.isStack = stackMode;
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
		if (this._name && !this.context.events[this._name]) {
			this.context.events[this._name] = new Map();
		}
		
		this.context.events[this._name].set(eventListener, eventListener as any);
		if (this.context.listeners.has(eventListener.handlers.callback!)) {
			this.context.listeners.get(eventListener.handlers.callback!)?.pushFork(eventListener);
		}else{
			this.context.listeners.set(eventListener.handlers.callback!, eventListener as any);
		}
	}

	private pushFork(eventListener: Event) {
		if (!this.handlers.forks) {
			this.handlers.forks = [];
		}
		this.handlers.forks.push(eventListener);
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
		for (let i = 0; i < this.handlers.emit.length; i++) {
			this.handlers.emit[i]();
		}
	}

	/**
	 * Check has handler in the event
	 * @param {EventCallback<D>} handler Event handler
	 * @returns {boolean}
	 */
	public hasHandler(handler: EventCallback<D>): boolean {
		return handler === this.handlers.callback;
	}

	public count() {
		return this.context.events[this._name]?.size ?? 0;
	}

	/**
	 * Remove the current listener
	 * @returns {void}
	 */
	public remove(): void {
		if (!this || !this.context.events || !this._name || !this.context.events[this._name]) return;
		this.context.events[this._name].delete(this);
		const event = this.context.listeners.get(this.handlers.callback!);
		event?.handlers.forks?.forEach((event) => event !== this ? event.remove() : null);
		this.context.listeners.delete(this.handlers.callback!);
		
		if (!this.isStack) {
			this._name = undefined;
			this.handlers.callback = undefined;
		}
		for (let i = 0; i < this.handlers.remove.length; i++) {
			this.handlers.remove[i]();
		}
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