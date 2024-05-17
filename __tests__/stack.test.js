import EventEmitter from "../src";

test('Stack create', () => {
	const listener = EventEmitter.addListener('__test', () => {});
	const stack = new EventEmitter.Stack([listener]);
	expect(stack.name).toBe('__stack');
});


test('Stack remove', () => {
	var result = '';
	const listener = EventEmitter.addListener('__test', (val) => {
		expect(val).toBe(123);
		result = val;
	});

	const stack = new EventEmitter.Stack([listener]);
	stack.emit(123);
	stack.remove();
	stack.emit(321);
	expect(result).toBe(123);
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