import EventEmitter from "../src";

test('Stack create', () => {
	const listener = EventEmitter.addListener('__test', () => {});
	const stack = new EventEmitter.Stack([listener]);
	expect(stack.name).toBe('__stack');
});


test('Stack remove', () => {
	const result = [];
	const listener1 = EventEmitter.addListener('__test', (val) => {
		expect(val).toBe(123);
		result.push('A-' + val);
	});

	const events = new EventEmitter();

	const listener2 = events.addListener('__test2', (val) => {
		expect(val).toBe(123);
		result.push('B-' + val);
	});

	const stack = new EventEmitter.Stack([listener1, listener2]);
	stack.emit(123);
	stack.remove();
	listener1.emit(321);
	listener2.emit(321);
	stack.emit(321);
	expect(result).toEqual([
		'A-123',
		'B-123'
	]);
});

test('Stack emit', () => {
	const events = new EventEmitter();

	const result = [];

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