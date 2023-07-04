import cluster from 'cluster';

function main() {
  const func = (data: any) => {
    console.log('主进程接收', data);
  };

  if (cluster.isMaster) {
    console.log('主进程', process.pid);
    const workers = Array(2).fill(0).map(() => cluster.fork());
    workers.forEach((worker) => worker.on('message', func));
  } else {
    console.log('子进程', process.pid);
    setInterval(() => {
      console.log('子进程发送', process.pid);
      process.send?.(process.pid);
    }, 2000);
  }
}

main();
