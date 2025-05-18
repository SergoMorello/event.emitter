import type Events from "./Event";
import type Event from "./Event";

export type EventObject<T> = {
	[E in keyof T]: Map<Event, Event<T, E, T[E]>>;
};

export type EventsObject<T = any> = {
	[index: string]: EventObject<T>;
};

export type EventCallback<T> = (data: T) => void;

export type EventHandlers<D> = {
	callback?: EventCallback<D>;
	forks?: Event[];
	emit: (() => void)[];
	remove: (() => void)[];
};

export interface EventListener<T = any, E extends keyof T = keyof T, D extends T[E] = T[E]> extends Event<T, E, D> {};

export type EventListeners = EventListener[];

export {
	/**
	 * @deprecated This type is deprecated
	 */
	Events,
	/**
	 * @deprecated This type is deprecated
	 */
	Event
};