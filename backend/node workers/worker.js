const { parentPort } = require('worker_threads')

parentPort.on('message', (message) => {
  setTimeout(() => {
    const result = message * 2;
    parentPort.postMessage(result)
  }, 1000)
})