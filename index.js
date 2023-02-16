import EventEmitter from "./EventEmitter";

export default class extends EventEmitter {
	static #instanse = null;

	static #init() {
		return this.#instanse = this.#instanse instanceof EventEmitter ? this.#instanse : new EventEmitter(true);
	}

	static emit(...args) {
		return this.#init().emit(...args);
	}

	static addListener(...args) {
		return this.#init().addListener(...args);
	}

	static removeAllListeners(...args) {
		return this.#init().removeAllListeners(...args);
	}
};