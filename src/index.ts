import Events from "./Events";
import Stack from "./Stack";
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
export default class EventEmitter<T = any> extends Events<T> implements Events<T> {
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
	 * Subscribes to an event and registers a persistent listener.
	 *
	 * The callback will be invoked every time the specified event is emitted
	 * until the returned listener is explicitly removed.
	 *
	 * @typeParam EVENT - Event name from the event map.
	 * @typeParam DATA - Payload type associated with the event.
	 *
	 * @param event - The event name to subscribe to.
	 * @param callback - Function invoked when the event is emitted.
	 *
	 * @returns An {@link Event} instance that can be used to manage
	 *          the listener lifecycle (e.g. remove the listener).
	 */
	public static on = this.instance.on;

	/**
	 * Subscribes to an event and registers a one-time listener.
	 *
	 * The callback will be invoked only once — on the next emission
	 * of the specified event — and the listener will be automatically
	 * removed immediately after invocation.
	 *
	 * @typeParam EVENT - Event name from the event map.
	 * @typeParam DATA - Payload type associated with the event.
	 *
	 * @param event - The event name to subscribe to.
	 * @param callback - Function invoked once when the event is emitted.
	 *
	 * @returns An {@link Event} instance representing the one-time listener.
	 */
	public static once = this.instance.once;

	/**
	 * Remove listener in current event instanse
	 * @returns {void}
	 */
	public static removeListener = this.instance.removeListener;

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	public static removeAllListeners = this.instance.removeAllListeners;

	/**
	 * Class for create the stack events
	 * @returns {Stack}
	 */
	public static Stack = Stack;
};