<h1>Event.Emitter</h1>

##	Easy EventEmitter

### Create local emitter
```
import EventEmitter from "easy-event-emitter";

const events = new EventEmitter();
```

### Global
```
const events = new EventEmitter(true);
```

### Methods

```
addListener(event name, callback); //return {remove()}
```

```
emit(event, data); //return void
```

```
removeAllListeners(); //return void
```