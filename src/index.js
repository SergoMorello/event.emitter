import Core from "./Core";

export default class EventEmitter extends Core {
	static #instanse = null;

	static #init() {
		return this.#instanse = this.#instanse instanceof Core ? this.#instanse : new Core(true);
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