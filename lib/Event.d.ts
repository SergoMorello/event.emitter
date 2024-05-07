import type { EventObject, EventCallback } from "./Types";
/** Event class */
export default class Event<T = any, E extends keyof T = keyof T, D extends T[E] = T[E]> {
    private events;
    private listeners;
    private _name?;
    private handlers;
    /**
     * Constructor new event
     * @param {E} event Event name
     * @param {EventCallback<D>} callback Callback function
     * @param {EventObject<T>} events Static events parent
     */
    constructor(event: E, callback: EventCallback<D>, events: EventObject<T>, listeners: Event<T>[]);
    private init;
    /**
     * Event name
     * @returns {string | undefined}
     */
    get name(): string | undefined;
    /**
     * Emit current listener
     * @param {D} data Data for event
     * @returns {void}
     */
    emit(data: D): void;
    /**
     * Check has handler in the event
     * @param {EventCallback<D>} handler Event handler
     * @returns {boolean}
     */
    hasHandler(handler: EventCallback<D>): boolean;
    /**
     * Remove current listener
     * @returns {void}
     */
    remove(): void;
    /**
     * Listener when event emitted
     * @param {Function} handlerEmit
     * @returns {void}
     */
    onEmit(handlerEmit: () => void): void;
    /**
     * Listener when event remove
     * @param {Function} handlerRemove
     * @returns {void}
     */
    onRemove(handlerRemove: () => void): void;
}
