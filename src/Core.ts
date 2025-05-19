import { EventCallback, EventObject } from "./Types";
import type Event from "./Event";

abstract class Core<T> {
	protected listeners: Map<EventCallback<any>, Event<T>>;

	protected events: EventObject<T>;

	constructor(context?: Core<T>) {
		if (context) {
			this.listeners = context.listeners;
			this.events = context.events;
		}else{
			this.listeners = new Map();
			this.events = {} as EventObject<T>;
		}
	}
}

export default Core;