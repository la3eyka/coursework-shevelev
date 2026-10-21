import Fastify from 'fastify';
import cors from '@fastify/cors';

// Создание приложения вынесено отдельно, чтобы его можно было тестировать
// без запуска сетевого сервера.
export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: 'http://localhost:5173',
  });

  app.get('/api/health', async () => {
    return {
      status: 'ok',
      project: 'Web Performance Analyzer',
      version: '0.1.0',
    };
  });

  return app;
}
