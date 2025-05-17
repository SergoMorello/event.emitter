import EventEmitter from "../src";

test('Remove', (done) => {
	const events = new EventEmitter();
	
	const testHandler = (e) => {
		expect(e).toBe('ok');
		done();
	};

	events.addListener('__test', testHandler);
	events.emit('__test', 'ok');
	const listener = events.addListener('__test', (e) => {
		expect(e).not.toBe('not-ok');
	});
	
	listener.remove();
	expect(listener.name).toBeUndefined();
	listener.emit('not-ok');

	for(let i = 0; i < 100; i++) {
		const listener = events.addListener('__test2', (e) => {
			expect(e).not.toBe('not-ok');
		});
		listener.remove();
	}
	events.emit('__test2', 'not-ok');

});

test('Remove handler', () => {
	const events = new EventEmitter();

	const testHandler = (e) => {
		expect(e).not.toBe('not-ok');
	};

	const listener = events.addListener('__test3', testHandler);
	expect(listener.name).toBe('__test3');
	events.removeListener(testHandler);
	expect(listener.name).toBeUndefined();
	listener.emit('not-ok');
});

test('Remove all listeners', (done) => {
	const events = new EventEmitter();

	const result = [];
	
	for(let i = 0; i < 200; i++) {
		events.addListener('__test-i-' + i, (e) => {
			expect(e).toBe('ok-i-' + i);
			result.push(i);
		});
	}

	for(let i = 0; i < 200; i++) {
		events.emit('__test-i-' + i, 'ok-i-' + i);
		if (i === 99) events.removeAllListeners();
	}
	
	if (result.length === 100) done();
});