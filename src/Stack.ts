import Event from "./Event";
import { EventObject } from "./Types";

class Stack<T = any> extends Event<T> {
	constructor(listeners: Event[]) {
		const _listeners: Event<T>[] = [];

		super('__stack' as keyof T, (data) => {
			_listeners.forEach((listener) => listener !== this ? listener.emit(data) : null);
		}, {} as EventObject<T>, _listeners, true);

		listeners.forEach((listener) => this.pushListener(listener));
	}
}

export default Stack;