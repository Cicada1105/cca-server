const { Worker } = require('worker_threads');

function run(interval) {
  let newWorker = new Worker('./worker/worker.js');
  newWorker.postMessage({ interval });
}

module.exports = {
  run
}