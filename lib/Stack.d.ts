import Event from "./Event";
declare class Stack<T = any> extends Event<T> {
    constructor(listeners?: Event<T>[]);
    /**
     * Push listener to the current stack
     * @param {Event<T>} eventListener
     * @returns {void}
     */
    push(eventListener: Event<T>): void;
    /**
     * Remove listener in the current stack
     * @returns {void}
     */
    remove(eventListener?: Event<T>): void;
    /**
     * Count the number of listeners in the current stack
     * @returns {number}
     */
    get length(): number;
}
export default Stack;
