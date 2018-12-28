const { batch } = require('./batch');

async function action(index) {
  const result = await new Promise(reslove => reslove({ index: index + 1 })).then(res => res);
  const data = await new Promise(reslove => reslove({ index })).then(res => res);
  return { result, data };
}

(async () => {
  const promiseList = new Array(20000).fill(1).map(i => action(i));
  await batch({
    batchList: promiseList,
    batchNumber: 2000,
  });
})();
