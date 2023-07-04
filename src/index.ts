import cluster from 'cluster';

function main() {
  if (cluster.isMaster) {
    console.log('主进程', process.pid);
    const worker = cluster.fork();
    worker.on('message', (data) => {
      console.log('主进程接收', data);
    });
  } else {
    console.log('子进程', process.pid);
    setInterval(() => {
      console.log('子进程发送', process.pid);
      process.send?.(process.pid);
    }, 2000);
  }
}

main();
