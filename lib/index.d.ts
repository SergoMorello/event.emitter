import Core from "./Core";
import { Callback } from "./Types";
/** Easy Event Emitter */
export default class EventEmitter extends Core {
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
     * @returns {Object} {remove: Function}
     */
    static addListener(event: string, callback: Callback): import("./Types").Listener;
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    static removeAllListeners(): void;
}