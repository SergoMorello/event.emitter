import { Event as EventInt, EventObject, EventCallback } from "./Types";
/** Event class */
export default class Event<T> implements EventInt {
    private events;
    private _name;
    private callback;
    /**
     * Constructor new event
     * @param {string} event Event name
     * @param {EventCallback} callback Callback function
     * @param {EventObject} events Static events parent
     */
    constructor(event: string, callback: EventCallback<T>, events: EventObject);
    /**
     * Event name
     * @returns {string}
     */
    get name(): string;
    /**
     * Emit current listener
     * @param {T} data Data for event
     * @returns {void}
     */
    emit(data: T): void;
    /**
     * Remove current listener
     * @returns {void}
     */
    remove(): void;
}
