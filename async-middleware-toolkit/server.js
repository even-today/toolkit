/**
 * Created by Liu Xindi on 2018/12/20.
 */

const http = require('http');

class App {
  constructor() {
    this.middleWares = [];
    this.index = 0;
  }
  
  async handle(request, response, handler) {
    const next = async () => {
      const task = this.middleWares[this.index];
      this.index += 1;
      if (!task) {
        await handler(request, response);
        return null;
      }
      await task(request, response, next);
    };
    await next();
  }
  
  use(middleWare) {
    this.middleWares.push(middleWare);
  }
}

function createServer(request, response) {
  const app = new App();

  app.use(async (req, res, next) => {
    console.log('start middleware 1');
    const result = await new Promise(reslove => reslove('middleware 1 promise done'));
    console.log(result);
    await next();
    console.log('end middleware 1');
  });
  
  app.use((req, res, next) => {
    console.log('start middleware 2');
    next();
    console.log('end middleware 2');
  });
  
  app.handle(request, response, async (req, res) => {
    console.log('handle the request and response');
    res.statusCode = 301;
    return res.end('teststet');
  });
}


http.createServer(createServer).listen(3002, () => {
  console.log('start server in 3002');
});
