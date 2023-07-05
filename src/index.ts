import cluster from 'cluster';

let old_time = 0;

function loop(func: () => void, i = 0) {
  if (i === 10000) {
    console.log(Number(new Date()) - old_time);
    return;
  }
  func();
  // setImmediate(() => loop(func, ++i));
  // process.nextTick(() => loop(func, ++i));
  setTimeout(() => loop(func, ++i));
}

function main() {
  let i = 0;
  old_time = Number(new Date());
  loop(() => i++);
}

main();
