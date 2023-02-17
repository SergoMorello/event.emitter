import Core from "./Core";

export default class EventEmitter extends Core {
	static #instance = new EventEmitter(true);

	static emit(...args) {
		return this.#instance.emit(...args);
	}

	static addListener(...args) {
		return this.#instance.addListener(...args);
	}

	static removeAllListeners(...args) {
		return this.#instance.removeAllListeners(...args);
	}
};