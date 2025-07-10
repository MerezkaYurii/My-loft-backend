import 'reflect-metadata';
import { Tcp } from './infra/Tcp';

async function bootstrap() {
  const tcp = new Tcp();
  await tcp.init(); // запускаем сервер
}

bootstrap().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});
