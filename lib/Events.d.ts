import type { EventCallback, Events as EventsInt } from "./Types";
import Event from "./Event";
/** Events class */
export default class Events implements EventsInt {
    private static globalName;
    private static events;
    private listeners;
    private events;
    /**
     * Event constructor
     * @param {string|boolean|undefined} group Events group name
     */
    constructor(group?: string | boolean | undefined);
    /**
     * Event emitter
     * @param {string} event Event name
     * @param {T} data Any data
     * @returns {void}
     */
    emit<T>(event: string, data: T): void;
    /**
     * Add listener for event
     * @param {string} event Event name
     * @param {EventCallback} callback Callback function
     * @returns {Event} {remove: Function, emit: Function}
     */
    addListener<T>(event: string, callback: EventCallback<T>): Event<T>;
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    removeAllListeners(): void;
}
