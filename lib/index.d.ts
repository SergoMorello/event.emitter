import Events from "./Events";
import Stack from "./Stack";
export type { Event, Events, EventListener, EventListeners, EventsObject, EventObject, EventCallback, EventHandlers } from "./Types";
/** Easy Event Emitter */
export default class EventEmitter<T = any> extends Events<T> {
    private static instance;
    /**
     * Event emitter
     * @param {string} event Event name
     * @param {any} data Any data
     * @returns {void}
     */
    static emit: <EVENT extends string | number | symbol, DATA extends any>(event: EVENT, data: DATA) => void;
    /**
     * Add listener for event
     * @param {string} event Event name
     * @param {EventCallback<any>} callback Callback function
     * @returns {Event<any>} Event object
     */
    static addListener: <EVENT extends string | number | symbol, DATA extends any>(event: EVENT, callback: import("./Types").EventCallback<DATA>) => import("./Event").default<any, EVENT, DATA>;
    /**
     * Remove listener in current event instanse
     * @returns {void}
     */
    static removeListener: (handler: import("./Types").EventCallback<any>) => void;
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    static removeAllListeners: () => void;
    /**
     * Class for create the stack events
     * @returns {Stack}
     */
    static Stack: typeof Stack;
}
