import Event from "./Event";
import Events from "./index";

class Stack<T = any> extends Event<T> {
	constructor(listeners: Event<T>[] = []) {
		const stackEmitter = new Events<T>();

		super('__stack' as keyof T, (data) => {
			stackEmitter.listeners.forEach((listener) => listener.isStack ? listener.emit(data) : null);
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
		if (!this || !this.context.events || !this._name || !this.context.events[this._name]) return;

		this.context.events[this._name] = this.context.events[this._name].filter((event) => {
			if (eventListener) {
				return event !== eventListener;
			}
			return event !== this;
		});

		// this.context.listeners = this.context.listeners.filter((listener) => {
		// 	if (eventListener) {
		// 		if (listener === eventListener) {
		// 			listener.remove();
		// 			return false;
		// 		}else{
		// 			return true;
		// 		}
		// 	}
		// 	if (listener !== this) listener.remove();
		// 	return listener !== this;
		// });

		for (const [listenerKey, listener] of this.context.listeners) {
			if (eventListener) {
				if (listener === eventListener) {
					listener.remove();
					// this.context.listeners.delete(listenerKey);
				}
			} else if (listener !== this) {
				listener.remove();
				// this.context.listeners.delete(listenerKey);
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
		return Number(this.context.listeners.size - 1);
	}
}

export default Stack;