import { Events as EventsInt } from "./Types";
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
     * @param {any} data Any data
     * @returns {void}
     */
    emit(event: string, data: any): void;
    /**
     * Add listener for event
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {Event} {remove: Function, emit: Function}
     */
    addListener(event: string, callback: Function): Event;
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    removeAllListeners(): void;
}
