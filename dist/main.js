'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('reflect-metadata');
const Tcp_1 = require('./infra/Tcp');
const initMongoConnection_1 = require('db/initMongoConnection');
async function bootstrap() {
  await (0, initMongoConnection_1.initMongoConnection)();
  const tcp = new Tcp_1.Tcp();
  await tcp.init(); // запускаем сервер
}
bootstrap().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});
//# sourceMappingURL=main.js.map
