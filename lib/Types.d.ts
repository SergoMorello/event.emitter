export interface Events {
    [index: string | number]: any;
}
export interface EventsContainer {
    __groups: Events;
    __global: Events;
}
export interface Callback {
    /**
     * Callback event
     * @param {string} data Data return of emit
     * @returns {void}
     */
    (data: string): void;
}
export interface Listener {
    /**
     * Function remove current listener
     * @returns {void}
     */
    remove(): void;
}
