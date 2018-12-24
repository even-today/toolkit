const { batch } = require('./batch');

(async () => {
  const promiseList = [];
  for (let i = 0; i < 1000000; i += 1) {
    const task = new Promise(reslove => reslove({ index: i })).then(res => res);
    promiseList.push(task);
  }
  await batch({
    batchList: promiseList,
    batchNumber: 2000,
  });
})();
