import { Event as EventInt, EventObject } from "./Types";
/** Event class */
export default class Event implements EventInt {
    private events;
    private name;
    private callback;
    private index;
    /**
     * Constructor new event
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @param {EventObject} events Static events parent
     */
    constructor(event: string, callback: Function, events: EventObject);
    /**
     * Create instanse index
     * @param {string} event Event name
     * @returns {number} new index
     */
    private createIndex;
    /**
     * Emit current listener
     * @param {any} data Data for event
     * @returns {void}
     */
    emit(data: any): void;
    /**
     * Remove current listener
     * @returns {void}
     */
    remove(): void;
}
