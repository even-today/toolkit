// number：batch operation number at same time
// batchList: batch operation list
// logging: every batch logging the process
module.exports = {
  async batch({
    batchNumber = 1, batchList = [], logging = true,
  }) {
    const startTime = new Date().getTime();
    if (Number.isNaN(batchNumber)) return { error: 'batchNumber should be a number' };
    if (!Array.isArray(batchList)) return { error: 'batchList should be an array' };
    const tasks = Object.assign([], batchList);
    const total = tasks.length;
    console.log(`开始处理异步任务，共 ${total} 个，每次批量处理 ${batchNumber} 个`);
    // start operation
    console.log('============= 异步任务开始处理 =============');
    if (logging) {
      let restNumber = total;
      while (tasks.length !== 0) {
        restNumber -= batchNumber;
        console.log(`异步任务共 ${total} 个, 剩余 ${restNumber} 个`)
        await Promise.all(tasks.splice(0, batchNumber)).catch(e => console.log('error => ', e.message));
      }
    } else {
      while (tasks.length !== 0) {
        await Promise.all(tasks.splice(0, batchNumber)).catch(e => console.log('error => ', e.message));
      }
    }
    console.log('============= 异步任务处理完毕 =============');
    const endTime = new Date().getTime();
    console.log(`共耗时 ${endTime - startTime} ms`);
    return null;
  },
};
