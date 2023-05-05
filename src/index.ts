import Core from "./Core";
import { Callback } from "./Types";

/** Easy Event Emitter */
export default class EventEmitter extends Core {
	private static instance = new EventEmitter(true);

	/**
	 * Event emitter
	 * @param {string} event Event name
	 * @param {any} data Any data
	 * @returns {void}
	 */
	public static emit(event: string, data: any) {
		return this.instance.emit(event, data);
	}

	/**
	 * Add listener for event
	 * @param {string} event Event name
	 * @param {Function} callback Callback function
	 * @returns {Object} {remove: Function}
	 */
	public static addListener(event: string, callback: Callback) {
		return this.instance.addListener(event, callback);
	}

	/**
	 * Remove all listeners in current event instanse
	 * @returns {void}
	 */
	public static removeAllListeners() {
		return this.instance.removeAllListeners();
	}
};