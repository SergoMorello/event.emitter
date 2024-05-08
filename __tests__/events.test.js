import EventEmitter from "../src";

test('emit instanse', (done) => {
	const events = new EventEmitter();

	const listener = events.addListener('__test', (e) => {
		expect(e).toBe('ok');
		done();
	});

	listener.emit('ok');
});

test('emit event', (done) => {
	const events = new EventEmitter();

	events.addListener('__test', (e) => {
		expect(e).toBe('ok');
		done();
	});

	events.emit('__test', 'ok');
});

test('emit static', (done) => {
	EventEmitter.addListener('__test-static', (e) => {
		expect(e).toBe('ok');
		done();
	});

	EventEmitter.emit('__test-static', 'ok');
});

test('emit groups', (done) => {
	const events_1 = new EventEmitter('group-1');
	const events_2 = new EventEmitter('group-1');
	const events_3 = new EventEmitter('group-2');

	const result = [];

	const testHandler = (e) => {
		result.push(e);
	};

	const listener = events_1.addListener('__test', testHandler);

	events_3.addListener('__test', testHandler);

	events_3.addListener('__test2', (e) => {
		expect(e).toBe('ok-3');
		done();
	});

	events_2.emit('__test', 'ok-1');
	listener.emit('ok-2');
	events_3.emit('__test2', 'ok-3');
	expect(result).toEqual([
		'ok-1',
		'ok-2'
	]);
});

test('emit static groups', (done) => {
	const events = new EventEmitter(true);

	const result = [];

	const testHandler = (e) => {
		result.push(e);
	};

	
	const listener = events.addListener('__test', testHandler);
	events.addListener('__test2', (e) => {
		expect(e).toBe('ok-2');
		done();
	});
	EventEmitter.addListener('__test', testHandler);

	listener.emit('ok-listener');
	events.emit('__test', 'ok-groups');
	EventEmitter.emit('__test2', 'ok-2');

	expect(result).toEqual([
		'ok-listener',
		'ok-groups',
		'ok-groups'
	]);
});