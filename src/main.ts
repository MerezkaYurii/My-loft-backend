import 'reflect-metadata';
import { Tcp } from './infra/Tcp';
import { initMongoConnection } from 'db/initMongoConnection';

async function bootstrap() {
  await initMongoConnection();

  const tcp = new Tcp();
  await tcp.init(); // запускаем сервер
}

bootstrap().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});
