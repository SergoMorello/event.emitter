!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.EventEmitter=t():e.EventEmitter=t()}(self,(()=>(()=>{"use strict";var e={987:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t,i){Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_name",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"callback",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.events=i,this._name=e,this.callback=t,this.events[e]||(this.events[e]=[]),this.events[e].push(this)}get name(){return this._name}emit(e){this.callback(e)}remove(){this.events[this.name]&&(this.events[this.name]=this.events[this.name].filter((e=>e!==this)),this._name="",this.callback=()=>{})}}},518:function(e,t,i){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(i(987));class s{constructor(e){Object.defineProperty(this,"listeners",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.listeners=[],this.events={},this.emit=this.emit.bind(this),this.addListener=this.addListener.bind(this),this.removeAllListeners=this.removeAllListeners.bind(this),"boolean"==typeof e&&!0===e?this.events=s.events[s.globalName]:"string"==typeof e&&e!==s.globalName&&(s.events[e]||(s.events[e]={}),this.events=s.events[e])}emit(e,t){this.events[e]&&this.events[e].forEach((e=>{e.emit(t)}))}addListener(e,t){const i=new r.default(e,t,this.events);return this.listeners.push(i),i}removeAllListeners(){this.listeners.reverse().forEach((e=>{e.remove()}))}}Object.defineProperty(s,"globalName",{enumerable:!0,configurable:!0,writable:!0,value:"__global"}),Object.defineProperty(s,"events",{enumerable:!0,configurable:!0,writable:!0,value:{[s.globalName]:{}}}),t.default=s},607:function(e,t,i){var n,r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(i(518));class a extends s.default{}n=a,Object.defineProperty(a,"instance",{enumerable:!0,configurable:!0,writable:!0,value:new a(!0)}),Object.defineProperty(a,"emit",{enumerable:!0,configurable:!0,writable:!0,value:n.instance.emit}),Object.defineProperty(a,"addListener",{enumerable:!0,configurable:!0,writable:!0,value:n.instance.addListener}),Object.defineProperty(a,"removeAllListeners",{enumerable:!0,configurable:!0,writable:!0,value:n.instance.removeAllListeners}),t.default=a}},t={};return function i(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,i),s.exports}(607)})()));
//# sourceMappingURL=index.js.map