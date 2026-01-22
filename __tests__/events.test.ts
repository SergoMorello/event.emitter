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
	EventEmitter.addListener<string>('__test-static', (e: string) => {
		expect(e).toBe('ok');
		done();
	});

	EventEmitter.emit<string>('__test-static', 'ok');
});

test('emit groups', (done) => {
	type Events = {
		'__test': 'ok-1' | 'ok-2';
		'__test2': string;
	};

	const events_1 = new EventEmitter<Events>('group-1');
	const events_2 = new EventEmitter('group-1');
	const events_3 = new EventEmitter<Events>('group-2');

	const result: string[] = [];

	const testHandler = (e: string) => {
		result.push(e);
	};

	const listener = events_1.addListener('__test', testHandler);
	events_1.addListener('__test', testHandler);

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
		'ok-1',
		'ok-2'
	]);
});

test('emit static groups', (done) => {
	const events = new EventEmitter(true);

	const result: string[] = [];

	const testHandler = (e: string) => {
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

test('event count', () => {
	const events = new EventEmitter();

	events.addListener('test1', () => {});
	events.addListener('test1', () => {});
	const event = events.addListener('test1', () => {});

	expect(event.count()).toBe(3);

	events.removeAllListeners();

	expect(event.count()).toBe(0);
});

test('events count', () => {
	const events = new EventEmitter();
	
	events.addListener('test1', () => {});
	events.addListener('test1', () => {});
	events.addListener('test2', () => {});
	events.addListener('test2', () => {});
	events.addListener('test3', () => {});
	const event = events.addListener('test1', () => {});

	expect(events.listenerCount('test1')).toBe(3);
	expect(events.listenerCount('test2')).toBe(2);
	expect(events.listenerCount('test3')).toBe(1);
	expect(events.listenerCount('test4')).toBe(0);
	expect(events.listenerCount()).toBe(6);

	events.removeAllListeners();

	expect(events.listenerCount('test1')).toBe(0);
	expect(events.listenerCount('test2')).toBe(0);
	expect(events.listenerCount('test3')).toBe(0);
	expect(events.listenerCount()).toBe(0);
});

test('emit once event', (done) => {
	const events = new EventEmitter();

	const listener = events.once('__test', (e) => {
		expect(e).toBe('ok');
		done();
	});

	events.emit('__test', 'ok');
	expect(listener.name).toBeUndefined();
});