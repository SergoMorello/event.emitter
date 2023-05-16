import Events from "./Events";
import Event from "./Event";
export { Events, Event, EventsObject, EventObject } from "./Types";
/** Easy Event Emitter */
export default class EventEmitter extends Events {
    private static instance;
    /**
     * Event emitter
     * @param {string} event Event name
     * @param {any} data Any data
     * @returns {void}
     */
    static emit(event: string, data: any): void;
    /**
     * Add listener for event
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {Event} {remove: Function, emit: Function}
     */
    static addListener(event: string, callback: Function): Event;
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    static removeAllListeners(): void;
}
