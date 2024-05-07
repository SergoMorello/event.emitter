<h1>Event.Emitter</h1>

##	Easy EventEmitter

### Install
```js
npm i easy-event-emitter
```

### Create isolated emitter
```js
import EventEmitter from "easy-event-emitter";

const events = new EventEmitter();
```

### Global
```js
const events = new EventEmitter(true);
```

### Methods

```js
addListener(event name, callback); //return {remove()}
```

```js
emit(event name, data); //return void
```

```js
removeAllListeners(); //return void
```

### Examples

#### Isolated
```js
const events1 = new EventEmitter();
const events2 = new EventEmitter();

events1.addListener('test', (val) => {
	console.log(val); //hello
});

const listener = events2.addListener('test', (val) => {
	console.log(val); //world
});

events2.addListener('test2', (val) => {
	console.log(val); //hi :-)
});

events1.emit('test', 'hello');
events2.emit('test', 'world');
events2.emit('test2', 'hi :-)');

listener.remove(); //Remove current listener

events2.removeAllListeners(); //Remove all listeners in current instance
```

#### Groups
```js
const events1 = new EventEmitter('test_group');
const events2 = new EventEmitter('test_group');

events1.addListener('test', (val) => {
	console.log(val); //"hello" replace "world"
});

events2.addListener('test', (val) => {
	console.log(val); //"hello" replace "world"
});

events1.emit('test', 'hello');
events2.emit('test', 'world');
```

#### Global
```js
const events = new EventEmitter(true);
events.addListener('test', (val) => {
	console.log(val); //"hello" replace "world"
});

const listener = EventEmitter.addListener('test', (val) => {
	console.log(val); //"hello" replace "world"
});

events.emit('test', 'hello');
EventEmitter.emit('test', 'world');

listener.remove(); //Remove current global listener

events.removeAllListeners(); //Remove all global listeners
//Or
EventEmitter.removeAllListeners();
```

#### Typing

```js
type TUser = {
	id: number;
	name: string;
	email: string;
};

type TEvents = {
	login: TUser;
	register: Omit<TUser, 'id'>
};

const events = new EventEmitter<TEvents>();
```

#### Use

```js
events.addListener('login', (user) => {
	// user: {
	// 	id: 1,
	// 	name: 'user',
	// 	email: 'user@gmail.com'
	// }
});

//...

events.addListener('register', (user) => {
	// user: {
	// 	name: 'new user',
	// 	email: 'new_user@gmail.com'
	// }
});
```

```js
events.emit('login', {
	id: 1,
	name: 'user',
	email: 'user@gmail.com'
});

events.emit('register', {
	name: 'new user',
	email: 'new_user@gmail.com'
});
```