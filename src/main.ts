import 'reflect-metadata';
import { Tcp } from './infra/Tcp';
import { initMongoConnection } from 'db/initMongoConnection';
import loftCollection from 'db/models/Loft';

async function bootstrap() {
  await initMongoConnection();

  await loftCollection.create({
    title: 'Новая квартира',
    description: 'Красивая квартира в центре города',
  });
  const tcp = new Tcp();
  await tcp.init(); // запускаем сервер
}

bootstrap().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});
