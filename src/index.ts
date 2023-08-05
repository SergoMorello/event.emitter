import Events from "./Events";
export {
	Events,
	Event,
	EventsObject,
	EventObject,
	EventCallback
} from "./Types";

/** Easy Event Emitter */
export default class EventEmitter extends Events {
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
	 * @param {EventCallback} callback Callback function
	 * @returns {Event} {remove: Function, emit: Function}
	 */
	public static addListener = this.instance.addListener;

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	public static removeAllListeners = this.instance.removeAllListeners;
};