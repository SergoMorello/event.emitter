import EventEmitter from "../lib";

test('Dynamic', () => {
	const events = new EventEmitter();
	const events_test1 = new EventEmitter('test1');
	const events_test2 = new EventEmitter('test2');
	expect(events.addListener('__test',(val) => {
		expect(val).toBe(1234);
	}));
	expect(events.emit('__test',1234)).toBeUndefined();

	events_test1.addListener('__test',(val) => {
		expect(val).toBe(123456);
	});
	expect(events_test1.emit('__test',123456))
	expect(events_test2.emit('__test',1234))
});