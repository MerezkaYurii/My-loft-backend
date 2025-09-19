import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug', // debug/info/error
  transport: {
    target: 'pino-pretty', // Красивый вывод в dev
    options: {
      colorize: true,
      translateTime: 'SYS:standard', // Показ времени
    },
  },
});

export default logger;
