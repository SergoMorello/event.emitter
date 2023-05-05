import { Callback, Listener } from "./Types";
declare class Core {
    #private;
    private events;
    /**
     * Event instanse
     * @param {string|boolean|undefined} name Name event group
     */
    constructor(name: string | boolean | undefined);
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
     * @param {function} callback Callback function
     * @returns {Object} {remove: Function}
     */
    addListener(event: string, callback: Callback): Listener;
    /**
     * Remove all listeners in current event instanse
     * @returns {void}
     */
    removeAllListeners(): void;
}
export default Core;
