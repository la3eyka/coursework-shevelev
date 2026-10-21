import { describe, expect, it } from 'vitest';
import { buildApp } from './app.js';

describe('GET /api/health', () => {
  it('возвращает успешный ответ сервера', async () => {
    const app = buildApp();

    try {
      const response = await app.inject({ method: 'GET', url: '/api/health' });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        status: 'ok',
        project: 'Web Performance Analyzer',
        version: '0.1.0',
      });
    } finally {
      await app.close();
    }
  });
});
