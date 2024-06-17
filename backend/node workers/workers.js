const { Worker } = require('worker_threads')

const worker = new Worker('./worker.js')

worker.on("message", (result) => {
  console.log(`Resultado: ${result}`)
})

worker.postMessage(5)