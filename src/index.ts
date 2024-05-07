import Events from "./Events";
export type {
	Event,
	Events,
	EventListener,
	EventListeners,
	EventsObject,
	EventObject,
	EventCallback,
	EventHandlers
} from "./Types";

/** Easy Event Emitter */
export default class EventEmitter<T = any> extends Events<T> {
	private static instance = new EventEmitter(true);

	/**
	 * Event emitter
	 * @param {string} event Event name
	 * @param {any} data Any data
	 * @returns {void}
	 */
	public static emit = this.instance.emit;

	/**
	 * Add listener for event
	 * @param {string} event Event name
	 * @param {EventCallback<any>} callback Callback function
	 * @returns {Event<any>} Event object
	 */
	public static addListener = this.instance.addListener;

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	public static removeAllListeners = this.instance.removeAllListeners;
};