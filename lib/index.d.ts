import Events from "./Events";
export { Events, Event, EventsObject, EventObject, EventCallback } from "./Types";
/** Easy Event Emitter */
export default class EventEmitter extends Events {
    private static instance;
    /**
     * Event emitter
     * @param {string} event Event name
     * @param {any} data Any data
     * @returns {void}
     */
    static emit: <T>(event: string, data: T) => void;
    /**
     * Add listener for event
     * @param {string} event Event name
     * @param {EventCallback} callback Callback function
     * @returns {Event} {remove: Function, emit: Function}
     */
    static addListener: <T>(event: string, callback: import("./Types").EventCallback<T>) => import("./Event").default<T>;
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    static removeAllListeners: () => void;
}
