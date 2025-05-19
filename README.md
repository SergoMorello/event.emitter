# Easy Event Emitter

[![npm version](https://img.shields.io/npm/v/easy-event-emitter.svg)](https://www.npmjs.com/package/easy-event-emitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A lightweight, type-safe event emitter implementation for TypeScript and JavaScript applications. This package provides a simple yet powerful way to handle events in your application with support for both isolated and global event handling.

## Quick Links to Framework Examples

- [React Example](#react-example)
- [Vue 3 Example](#vue-3-example)
- [Angular Example](#angular-example)
- [React with Event Stack](#react-example-with-event-stack)
- [Vue 3 with Event Stack](#vue-3-example-with-event-stack)
- [Angular with Event Stack](#angular-example-with-event-stack)

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

### Event Class API

The `Event` class represents a single event listener with its associated handlers and metadata.

#### Properties

```typescript
readonly isStack: boolean
```
Indicates whether this event is part of a stack.

```typescript
get name(): string | undefined
```
Returns the name of the event.

#### Methods

```typescript
emit(data: D): void
```
Emits the event with the specified data.

```typescript
hasHandler(handler: EventCallback<D>): boolean
```
Checks if the event has the specified handler.

```typescript
count(): number
```
Returns the number of listeners for this event.

```typescript
remove(): void
```
Removes the event listener and cleans up associated resources.

```typescript
onEmit(handlerEmit: () => void): void
```
Adds a handler to be called when the event is emitted.

```typescript
onRemove(handlerRemove: () => void): void
```
Adds a handler to be called when the event is removed.

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

## Usage in Modern Frameworks

### React Example

```typescript
// store/eventStore.ts
import EventEmitter from 'easy-event-emitter';

// Create a global event emitter for the application
export const eventEmitter = new EventEmitter();

// Define event types
export interface UserEvent {
  id: number;
  name: string;
}

// React Component Example
import React, { useEffect } from 'react';
import { eventEmitter, UserEvent } from './store/eventStore';

const UserProfile: React.FC = () => {
  useEffect(() => {
    // Add event listener when component mounts
    const listener = eventEmitter.addListener('userUpdate', (user: UserEvent) => {
      console.log('User updated:', user);
      // Update component state or trigger re-render
    });

    // Clean up listener when component unmounts
    return () => listener.remove();
  }, []);

  const handleUpdateUser = () => {
    // Emit event when user data is updated
    eventEmitter.emit('userUpdate', { id: 1, name: 'John Doe' });
  };

  return (
    <div>
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UserProfile;
```

### Vue 3 Example

```typescript
// store/eventStore.ts
import EventEmitter from 'easy-event-emitter';

export const eventEmitter = new EventEmitter();

// Vue Component Example
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { eventEmitter } from './store/eventStore';

export default defineComponent({
  setup() {
    let listener: any;

    onMounted(() => {
      // Add event listener when component is mounted
      listener = eventEmitter.addListener('dataUpdate', (data) => {
        console.log('Data updated:', data);
        // Update component state
      });
    });

    onUnmounted(() => {
      // Clean up listener when component is unmounted
      if (listener) {
        listener.remove();
      }
    });

    const updateData = () => {
      eventEmitter.emit('dataUpdate', { value: 'new data' });
    };

    return {
      updateData
    };
  }
});
```

### Angular Example

```typescript
// services/event.service.ts
import { Injectable } from '@angular/core';
import EventEmitter from 'easy-event-emitter';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventEmitter = new EventEmitter();

  emitEvent(eventName: string, data: any) {
    this.eventEmitter.emit(eventName, data);
  }

  addListener(eventName: string, callback: (data: any) => void) {
    return this.eventEmitter.addListener(eventName, callback);
  }
}

// component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="updateData()">Update Data</button>
  `
})
export class ExampleComponent implements OnInit, OnDestroy {
  private listener: any;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // Add event listener when component initializes
    this.listener = this.eventService.addListener('dataUpdate', (data) => {
      console.log('Data updated:', data);
      // Update component state
    });
  }

  ngOnDestroy() {
    // Clean up listener when component is destroyed
    if (this.listener) {
      this.listener.remove();
    }
  }

  updateData() {
    this.eventService.emitEvent('dataUpdate', { value: 'new data' });
  }
}
```

These examples demonstrate how to integrate the EventEmitter with modern frameworks while following their best practices and lifecycle management patterns. The EventEmitter can be used to create a centralized event system in your application, making it easy to communicate between different components and services.

### Using EventEmitter.Stack in Modern Frameworks

#### React Example with Event Stack

```typescript
// store/eventStore.ts
import EventEmitter from 'easy-event-emitter';

export const eventEmitter = new EventEmitter();

// Define event types
export interface UserEvents {
  profileUpdate: { id: number; name: string };
  settingsUpdate: { theme: string; notifications: boolean };
  statusUpdate: { online: boolean };
}

// React Component Example with Stack
import React, { useEffect } from 'react';
import { eventEmitter, UserEvents } from './store/eventStore';

const UserDashboard: React.FC = () => {
  useEffect(() => {
    // Create stack inside useEffect
    const stack = new EventEmitter.Stack();

    // Create and add listeners to the stack
    stack.push(
      eventEmitter.addListener('profileUpdate', (data) => {
        console.log('Profile updated:', data);
      })
    );

    stack.push(
      eventEmitter.addListener('settingsUpdate', (data) => {
        console.log('Settings updated:', data);
      })
    );

    stack.push(
      eventEmitter.addListener('statusUpdate', (data) => {
        console.log('Status updated:', data);
      })
    );

    // Clean up stack when component unmounts
    return () => stack.remove();
  }, []);

  const handleUpdates = () => {
    // Emit multiple events
    eventEmitter.emit('profileUpdate', { id: 1, name: 'John' });
    eventEmitter.emit('settingsUpdate', { theme: 'dark', notifications: true });
    eventEmitter.emit('statusUpdate', { online: true });
  };

  return (
    <div>
      <button onClick={handleUpdates}>Update All</button>
    </div>
  );
};

export default UserDashboard;
```

#### Vue 3 Example with Event Stack

```typescript
// store/eventStore.ts
import EventEmitter from 'easy-event-emitter';

export const eventEmitter = new EventEmitter();

// Vue Component Example with Stack
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { eventEmitter } from './store/eventStore';

export default defineComponent({
  setup() {
    let stack: EventEmitter.Stack;

    onMounted(() => {
      // Create stack inside onMounted
      stack = new EventEmitter.Stack();

      // Add listeners to the stack
      stack.push(
        eventEmitter.addListener('dataUpdate', (data) => {
          console.log('Data updated:', data);
        })
      );

      stack.push(
        eventEmitter.addListener('configUpdate', (config) => {
          console.log('Config updated:', config);
        })
      );

      stack.push(
        eventEmitter.addListener('stateUpdate', (state) => {
          console.log('State updated:', state);
        })
      );
    });

    onUnmounted(() => {
      // Clean up stack when component is unmounted
      if (stack) {
        stack.remove();
      }
    });

    const updateAll = () => {
      // Emit multiple events
      eventEmitter.emit('dataUpdate', { value: 'new data' });
      eventEmitter.emit('configUpdate', { setting: 'new setting' });
      eventEmitter.emit('stateUpdate', { status: 'active' });
    };

    return {
      updateAll
    };
  }
});
```

#### Angular Example with Event Stack

```typescript
// services/event.service.ts
import { Injectable } from '@angular/core';
import EventEmitter from 'easy-event-emitter';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventEmitter = new EventEmitter();

  emitEvent(eventName: string, data: any) {
    this.eventEmitter.emit(eventName, data);
  }

  addListener(eventName: string, callback: (data: any) => void) {
    return this.eventEmitter.addListener(eventName, callback);
  }
}

// component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <button (click)="updateAll()">Update All</button>
  `
})
export class DashboardComponent implements OnInit, OnDestroy {
  private stack: EventEmitter.Stack;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // Create stack inside ngOnInit
    this.stack = new EventEmitter.Stack();

    // Add listeners to the stack
    this.stack.push(
      this.eventService.addListener('userUpdate', (data) => {
        console.log('User updated:', data);
      })
    );

    this.stack.push(
      this.eventService.addListener('preferencesUpdate', (data) => {
        console.log('Preferences updated:', data);
      })
    );

    this.stack.push(
      this.eventService.addListener('activityUpdate', (data) => {
        console.log('Activity updated:', data);
      })
    );
  }

  ngOnDestroy() {
    // Clean up stack when component is destroyed
    if (this.stack) {
      this.stack.remove();
    }
  }

  updateAll() {
    // Emit multiple events
    this.eventService.emitEvent('userUpdate', { id: 1, name: 'John' });
    this.eventService.emitEvent('preferencesUpdate', { theme: 'dark' });
    this.eventService.emitEvent('activityUpdate', { status: 'active' });
  }
}
```

These examples demonstrate the correct usage of EventEmitter.Stack in modern frameworks, where:

1. The stack is created within the component's lifecycle (useEffect, onMounted, ngOnInit)
2. Event listeners are added to the stack immediately after creation
3. The stack is cleaned up when the component is destroyed
4. The stack is scoped to the component instance

This approach ensures that:
- Event listeners are properly managed within the component's lifecycle
- Memory leaks are prevented by cleaning up the stack
- The stack is isolated to the specific component instance
- Event handling is more organized and maintainable
