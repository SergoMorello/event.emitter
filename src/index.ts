import Core from "./Core";
import { Callback, Listener } from "./Types";

/** Easy Event Emitter */
export default class EventEmitter extends Core {
	private static instance = new EventEmitter(true);

	/**
	 * Event emitter
	 * @param {string} event Event name
	 * @param {any} data Any data
	 * @returns {void}
	 */
	public static emit(event: string, data: any): void {
		return this.instance.emit(event, data);
	}

	/**
	 * Add listener for event
	 * @param {string} event Event name
	 * @param {Function} callback Callback function
	 * @returns {Listener} {remove: Function}
	 */
	public static addListener(event: string, callback: Callback): Listener {
		return this.instance.addListener(event, callback);
	}

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	public static removeAllListeners(): void {
		return this.instance.removeAllListeners();
	}
};