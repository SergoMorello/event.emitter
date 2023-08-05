export type EventObject = {
	[index: string]: Array<Event>;
}

export type EventsObject = {
	[index: string]: EventObject;
}

export type EventCallback<T> = (data: T) => void;

export interface Event {
	emit(data: any): void;
	remove(): void;
}

export interface Events {
	emit<T>(event: string, data: T): void;
	addListener<T>(event: string, callback: EventCallback<T>): Event;
	removeAllListeners(): void;
}