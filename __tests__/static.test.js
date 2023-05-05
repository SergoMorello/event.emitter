import EventEmitter from "../lib";

test('Static', () => {
	expect(EventEmitter.addListener('__test',(val) => {
		expect(val).toBe(123);
	}));
	expect(EventEmitter.emit('__test',123)).toBeUndefined();

	const events = new EventEmitter();
	expect(events.emit('__test',12345))
});