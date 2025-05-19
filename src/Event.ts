import Core from "./Core";
import type Events from "./Events";
import type {
	EventCallback,
	EventHandlers
} from "./Types";

/** Event class */
export default class Event<T = any, E extends keyof T = keyof T, D extends T[E] = T[E]> extends Core<T> {
	public readonly isStack: boolean;
	protected _name?: E;
	private handlers: EventHandlers<D>;

	/**
	 * Constructor a new event
	 * @param {E} event Event name
	 * @param {EventCallback<D>} callback Callback function
	 * @param {EventObject<T>} events Static events parent
	 */
	constructor(event: E, callback: EventCallback<D>, context: Events<T>, stackMode = false) {
		super(context);
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
		if (this._name && !this.events[this._name]) {
			this.events[this._name] = new Map();
		}
		
		this.events[this._name].set(eventListener, eventListener as any);
		if (this.listeners.has(eventListener.handlers.callback!)) {
			this.listeners.get(eventListener.handlers.callback!)?.pushFork(eventListener);
		}else{
			this.listeners.set(eventListener.handlers.callback!, eventListener as any);
		}
	}

	/**
	 * Push fork listeners
	 * @param {Event} eventListener
	 * @returns {void}
	 */
	private pushFork(eventListener: Event): void {
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

	/**
	 * Get count listeners in event
	 * @returns {number}
	 */
	public count(): number {
		return this.events[this._name]?.size ?? 0;
	}

	/**
	 * Remove the current listener
	 * @returns {void}
	 */
	public remove(): void {
		if (!this || !this.events || !this._name || !this.events[this._name]) return;

		// Remove from events map
		this.events[this._name].delete(this);
		if (this.events[this._name].size === 0) {
			delete this.events[this._name];
		}

		// Get the parent event
		const parentEvent = this.listeners.get(this.handlers.callback!);
		
		// If this is a fork, remove it from parent's forks
		if (parentEvent && parentEvent.handlers.forks) {
			const forkIndex = parentEvent.handlers.forks.indexOf(this);
			if (forkIndex !== -1) {
				parentEvent.handlers.forks.splice(forkIndex, 1);
			}
		}

		// Remove from listeners map
		this.listeners.delete(this.handlers.callback!);
		
		// Clean up if not a stack
		if (!this.isStack) {
			this._name = undefined;
			this.handlers.callback = undefined;
		}

		// Call remove handlers
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