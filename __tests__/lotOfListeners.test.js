import EventEmitter from "../src";

test('emit a lot of listeners', (done) => {
	const events = new EventEmitter();

	for (let i = 0; i < 100; i++) {
		events.addListener('__test', (e) => {
			expect(e).toBe('ok');
		});
		events.addListener('__test' + i, (e) => {
			expect(e).toBe('ok-');
		});
	}

	for (let i = 0; i < 100; i++) {
		events.emit('__test', 'ok');
		events.emit('__test' + i, 'ok-');
	}
	done();
});