import EventEmitter from "../dist";

test('Remove', () => {
	const events = new EventEmitter();

	const test = (val) => {};

	events.addListener('__test', test);

	const listener = events.addListener('__test',(val) => {
		expect(val).toBeUndefined();
	});
	
	listener.remove();
	expect(listener.name).toBeUndefined();
	listener.emit('');

	for(var i = 0; i < 10; i++) {
		const event = events.addListener('__test2',(val) => {
			expect(val).toBeUndefined();
			
		});
		event.remove();
	}
	events.emit('__test2', '');

});

test('Remove handler', () => {
	const events = new EventEmitter();

	const test = (val) => {};

	const listener = events.addListener('__test3', test);
	expect(listener.name).toBe('__test3');
	events.removeListener(test);
	expect(listener.name).toBeUndefined();
});