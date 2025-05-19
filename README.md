# Easy Event Emitter

[![npm version](https://img.shields.io/npm/v/easy-event-emitter.svg)](https://www.npmjs.com/package/easy-event-emitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A lightweight, type-safe event emitter implementation for TypeScript and JavaScript applications. This package provides a simple yet powerful way to handle events in your application with support for both isolated and global event handling.

## Features

- 🚀 Type-safe event handling with TypeScript
- 🔄 Support for both isolated and global event emitters
- 🎯 Simple and intuitive API
- 📦 Lightweight and zero dependencies
- 🛠️ Built-in event group support
- 🔍 Full TypeScript support with type definitions
- 📚 Stack-based event handling

## Installation

```bash
npm install easy-event-emitter
# or
yarn add easy-event-emitter
```

## Quick Start

```typescript
import EventEmitter from 'easy-event-emitter';

// Create an isolated event emitter
const events = new EventEmitter();

// Add an event listener
const listener = events.addListener('userLogin', (user) => {
	console.log('User logged in:', user);
});

// Emit an event
events.emit('userLogin', { id: 1, name: 'John' });

// Remove the listener when done
listener.remove();
```

## API Reference

### EventEmitter Class

#### Constructor

```typescript
new EventEmitter<T>(isGlobal?: boolean | string)
```

- `T`: Type parameter for event payload types (optional)
- `isGlobal`: 
  - `true`: Creates a global event emitter
  - `string`: Creates an event emitter in a specific group
  - `false` or `undefined`: Creates an isolated event emitter

#### Instance Methods

##### addListener

```typescript
addListener(eventName: string, callback: EventCallback<T>): EventListener<T>
```

Adds an event listener and returns an event object with a `remove()` method.

- `eventName`: Name of the event to listen for
- `callback`: Function to be called when the event is emitted
- Returns: `EventListener<T>` object with a `remove()` method

##### emit

```typescript
emit(eventName: string, data: T): void
```

Emits an event with the specified data.

- `eventName`: Name of the event to emit
- `data`: Data to pass to the event listeners

##### removeListener

```typescript
removeListener(): void
```

Removes the current event listener.

##### removeAllListeners

```typescript
removeAllListeners(): void
```

Removes all listeners in the current event emitter instance.

#### Static Methods

```typescript
// Static methods with type parameter T
EventEmitter.emit<T>(eventName: string, data: T): void
EventEmitter.addListener<T>(eventName: string, callback: EventCallback<T>): EventListener<T>
EventEmitter.removeListener(handler: Function): void
EventEmitter.removeAllListeners(): void
```

### Event Stack

The `EventEmitter.Stack` class provides a way to manage a stack of event listeners. It's useful when you need to handle multiple events in a specific order or maintain a collection of related event listeners.

#### Constructor

```typescript
new EventEmitter.Stack<T>(listeners?: Event<T>[])
```

- `T`: Type parameter for event payload types (optional)
- `listeners`: Optional array of initial event listeners

#### Stack Methods

##### push

```typescript
push(eventListener: Event<T>): void
```

Adds an event listener to the stack.

- `eventListener`: The event listener to add to the stack

##### remove

```typescript
remove(eventListener?: Event<T>): void
```

Removes an event listener from the stack. If no listener is specified, removes the current stack.

- `eventListener`: Optional event listener to remove

##### length

```typescript
get length(): number
```

Returns the number of listeners in the stack (excluding the stack itself).

#### Stack Example

```typescript
import EventEmitter from 'easy-event-emitter';

// Create a stack of event listeners
const stack = new EventEmitter.Stack();

// Add listeners to the stack
const listener1 = events.addListener('userAction', (data) => {
	console.log('First listener:', data);
});

const listener2 = events.addListener('userAction', (data) => {
	console.log('Second listener:', data);
});

// Push listeners to the stack
stack.push(listener1);
stack.push(listener2);

// Emit an event that will be handled by all listeners in the stack
events.emit('userAction', { action: 'click' });

// Remove a specific listener from the stack
stack.remove(listener1);

// Get the number of listeners in the stack
console.log(stack.length); // 1

// Remove the entire stack
stack.remove();
```

## Type System

### Core Types

```typescript
// Event callback type
type EventCallback<T> = (data: T) => void;

// Event listener interface
interface EventListener<T = any>

// Event handlers type
type EventHandlers<D> = {
	callback?: EventCallback<D>;
	forks?: Event[];
	emit: (() => void)[];
	remove: (() => void)[];
};
```

## Usage Examples

### Type-Safe Events

```typescript
// Define your event types
type UserEvents = {
	login: { id: number; name: string };
	logout: { id: number };
	update: { id: number; data: Partial<User> };
};

// Create a type-safe event emitter
const events = new EventEmitter<UserEvents>();

// TypeScript will provide type checking and autocompletion
events.addListener('login', (user) => {
	console.log(`User ${user.name} logged in`);
});

events.emit('login', { id: 1, name: 'John' });
```

### Event Groups

```typescript
// Create event emitters in the same group
const emitter1 = new EventEmitter('userGroup');
const emitter2 = new EventEmitter('userGroup');

// Both emitters will receive events from the group
emitter1.addListener('userUpdate', (data) => {
	console.log('Emitter 1 received:', data);
});

emitter2.addListener('userUpdate', (data) => {
	console.log('Emitter 2 received:', data);
});

// Emit to the group
emitter1.emit('userUpdate', { id: 1, name: 'John' });
```

### Global Events

```typescript
// Create a global event emitter
const globalEvents = new EventEmitter(true);

// Add a global listener
const listener = globalEvents.addListener('appError', (error) => {
	console.error('Global error:', error);
});

// Emit a global event
globalEvents.emit('appError', new Error('Something went wrong'));

// Remove the listener when done
listener.remove();
```

### Static Event Handling

```typescript
// Add a static listener
const listener = EventEmitter.addListener<Error>('appError', (error) => {
	console.error('Global error:', error);
});

// Emit a static event
EventEmitter.emit<Error>('appError', new Error('Something went wrong'));

// Remove the listener
EventEmitter.removeListener(listener);
```

## Best Practices

1. **Type Safety**: Always define your event types for better type checking and IDE support.
2. **Memory Management**: Remember to remove listeners when they're no longer needed to prevent memory leaks.
3. **Event Groups**: Use event groups when you need to share events between different parts of your application.
4. **Global Events**: Use global events sparingly and only for application-wide concerns.
5. **Static vs Instance**: Use static methods for global events and instance methods for component-specific events.
6. **Event Stacks**: Use stacks when you need to manage multiple related event listeners as a group.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



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