import Event from "./Event";
import { EventObject } from "./Types";

class Stack<T = any> extends Event<T> {
	constructor(listeners: Event<T>[] = []) {
		const _listeners: Event<T>[] = [];

		super('__stack' as keyof T, (data) => {
			_listeners.forEach((listener) => listener !== this ? listener.emit(data) : null);
		}, {} as EventObject<T>, _listeners, true);

		listeners.forEach((listener) => this.push(listener));
	}

	/**
	 * Push listener to the current stack
	 * @param {Event<T>} eventListener
	 * @returns {void}
	 */
	public push(eventListener: Event<T>): void {
		super.push(eventListener);
	}

	/**
	 * Remove listener in the current stack
	 * @returns {void}
	 */
	public remove(eventListener?: Event<T>): void {
		if (!this || !this.events || !this._name || !this.events[this._name]) return;

		this.events[this._name] = this.events[this._name].filter((event) => {
			if (eventListener) {
				return event !== eventListener;
			}
			return event !== this;
		});

		this.listeners = this.listeners.filter((listener) => {
			if (eventListener) {
				if (listener === eventListener) {
					listener.remove();
					return false;
				}else{
					return true;
				}
			}
			if (listener !== this) listener.remove();
			return listener !== this;
		});

		if (eventListener) return;
		super.remove();
	}

	/**
	 * Count the number of listeners in the current stack
	 * @returns {number}
	 */
	public get length(): number {
		return Number(this.listeners.length - 1);
	}
}

export default Stack;