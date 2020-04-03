
const add = (x, y) => x + y;
console.log(add(3, 6));

const promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('定时器执行完了~');
    resolve();
  }, 1000);
});
console.log(promise);
