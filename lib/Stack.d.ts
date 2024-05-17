import Event from "./Event";
declare class Stack<T = any> extends Event<T> {
    constructor(listeners: Event[]);
}
export default Stack;
