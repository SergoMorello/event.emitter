import EventEmitter from "../src";

test('Stack create', () => {

	const listener1 = EventEmitter.addListener('__test', () => {});
	const listener2 = EventEmitter.addListener('__test2', () => {});
	const listener3 = EventEmitter.addListener('__test3', () => {});

	const stackVoid = new EventEmitter.Stack();
	expect(stackVoid.name).toBe('__stack');
	expect(stackVoid.length).toBe(0);

	const stack = new EventEmitter.Stack([listener1, listener2]);
	expect(stack.name).toBe('__stack');
	stack.push(listener3);
	expect(stack.length).toBe(3);
});


test('Stack remove', () => {
	const result: string[] = [];

	const listener1 = EventEmitter.addListener('__test', (val) => {
		expect(val).toBe(123);
		result.push('A-' + val);
	});

	const events = new EventEmitter();

	const listener2 = events.addListener('__test2', (val) => {
		expect(val).toBe(123);
		result.push('B-' + val);
	});

	const listener3 = events.addListener('__test3', (val) => {
		expect(val).toBe(123);
		result.push('C-' + val);
	});

	const stack = new EventEmitter.Stack([listener1, listener2, listener3]);
	stack.remove(listener3);
	stack.emit(123);
	listener3.emit(321);
	stack.remove();
	listener1.emit(321);
	listener2.emit(321);
	stack.emit(321);
	expect(stack.name).toBe('__stack');
	expect(result).toEqual([
		'A-123',
		'B-123'
	]);
});

test('Stack emit', () => {
	const events = new EventEmitter();

	const result: string[] = [];

	const listener1 = events.addListener('__test1', (val) => {
		result.push('A-' + val);
	});

	const listener2 = events.addListener('__test2', (val) => {
		result.push('B-' + val);
	});

	const listener3 = EventEmitter.addListener('__test3', (val) => {
		result.push('C-' + val);
	});

	const stack = new EventEmitter.Stack([listener1, listener2, listener3]);
	stack.emit(123);
	expect(result).toEqual([
		'A-123',
		'B-123',
		'C-123',
	]);
});

test('Stack events', () => {
	const events = new EventEmitter();

	const result: string[] = [];

	const listener1 = events.addListener('__test1', (val) => {});

	const listener2 = events.addListener('__test2', (val) => {});

	const listener3 = events.addListener('__test3', (val) => {});

	const stack = new EventEmitter.Stack([listener1, listener2]);

	listener1.onEmit(() => {
		result.push('A-emit');
	});

	listener2.onEmit(() => {
		result.push('B-emit');
	});

	listener3.onEmit(() => {
		result.push('C-emit');
	});

	listener1.onRemove(() => {
		result.push('A-remove');
	});

	listener2.onRemove(() => {
		result.push('B-remove');
	});

	listener3.onRemove(() => {
		result.push('C-remove');
	});

	stack.emit(123);
	stack.push(listener3);
	stack.remove(listener1);
	stack.emit(123);
	stack.remove(listener3);
	stack.remove();
	stack.emit(123);

	expect(result).toEqual([
		'A-emit',
		'B-emit',
		'A-remove',
		'B-emit',
		'C-emit',
		'C-remove',
		'B-remove'
	]);
});