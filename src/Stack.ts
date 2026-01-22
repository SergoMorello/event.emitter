import Event from "./Event";
import Events from "./index";

class Stack<T = any> extends Event<T> {
	constructor(listeners: Event<T, any, any>[] = []) {
		const stackEmitter = new Events<T>();
		super('__stack' as keyof T, (data) => {
			this.listeners.forEach((listener) => !listener.isStack ? listener.emit(data) : null);
		}, stackEmitter, true);
		
		for (let i = 0; i < listeners.length; i++) {
			this.push(listeners[i]);
		}
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

		this.events[this._name].delete(eventListener ?? this);

		for (const [_, listener] of this.listeners) {
			if (eventListener) {
				if (listener === eventListener) {
					listener.remove();
				}
			} else if (listener !== this) {
				listener.remove();
			}
		}

		if (eventListener) return;
		super.remove();
	}

	/**
	 * Count the number of listeners in the current stack
	 * @returns {number}
	 */
	public get length(): number {
		return Number(this.listeners.size - 1);
	}
}

export default Stack;