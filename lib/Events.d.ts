import type { EventCallback } from "./Types";
import Event from "./Event";
/** Events class */
export default abstract class Events<T> {
    private static globalName;
    private static _events;
    private listeners;
    private events;
    /**
     * Event constructor
     * @param {string|boolean|undefined} group Events group name
     */
    constructor(group?: string | boolean);
    /**
     * Event emitter
     * @param {EVENT} event Event name
     * @param {DATA} data Any data
     * @returns {void}
     */
    emit<EVENT extends keyof T, DATA extends T[EVENT]>(event: EVENT, data: DATA): void;
    /**
     * Add listener for event
     * @param {EVENT} event Event name
     * @param {DATA} callback Callback function
     * @returns {Event<T>} Event object
     */
    addListener<EVENT extends keyof T, DATA extends T[EVENT]>(event: EVENT, callback: EventCallback<DATA>): Event<T, EVENT, DATA>;
    /**
     * Remove listener in current event instanse
     * @returns {void}
     */
    removeListener(handler: EventCallback<any>): void;
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    removeAllListeners(): void;
}
