/**
 *		evento EVENTS do nodejs
 *   */
import { EventEmitter } from "events";

const eventEmmiter = new EventEmitter();
eventEmmiter.on("testEvent", (obj) => {
	console.dir(obj);
});


export default eventEmmiter