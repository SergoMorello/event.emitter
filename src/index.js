import Core from "./Core";

export default class EventEmitter extends Core {
	static #instanse = new EventEmitter(true);

	static emit(...args) {
		return this.#instanse.emit(...args);
	}

	static addListener(...args) {
		return this.#instanse.addListener(...args);
	}

	static removeAllListeners(...args) {
		return this.#instanse.removeAllListeners(...args);
	}
};