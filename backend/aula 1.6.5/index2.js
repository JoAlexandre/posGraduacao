import ev from "./index.js";

ev.on("testEvent", (msg) => console.log("ouviu tambem"));
ev.emit("testEvent", { teste: true });
