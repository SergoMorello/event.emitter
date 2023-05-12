export type EventObject = {
    [index: string]: Array<Event>;
};
export type EventsObject = {
    [index: string]: EventObject;
};
export interface Event {
    emit(data: any): void;
    remove(): void;
}
export interface Events {
    emit(event: string, data: any): void;
    addListener(event: string, callback: Function): Event;
    removeAllListeners(): void;
}
