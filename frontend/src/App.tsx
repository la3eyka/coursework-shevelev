import { useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  project: string;
  version: string;
};

type HealthState = 'loading' | 'online' | 'offline';

const plannedFeatures = [
  { title: 'Измерение', description: 'Получение метрик Lighthouse: FCP, LCP, TBT и CLS.' },
  { title: 'Рекомендации', description: 'Обнаружение проблем и формирование приоритетных действий.' },
  { title: 'Сравнение', description: 'Исследование показателей страницы до и после оптимизации.' },
];

function App() {
  const [healthState, setHealthState] = useState<HealthState>('loading');
  const [serverVersion, setServerVersion] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function checkServer() {
      try {
        const response = await fetch('/api/health', { signal: controller.signal });
        if (!response.ok) throw new Error('Сервер вернул ошибку');
        const data = (await response.json()) as HealthResponse;
        if (data.status !== 'ok') throw new Error('Некорректный статус сервера');
        setHealthState('online');
        setServerVersion(data.version);
      } catch {
        if (controller.signal.aborted) return;
        setHealthState('offline');
      }
    }

    void checkServer();
    return () => controller.abort();
  }, []);

  return (
    <div className="layout">
      <header className="topbar">
        <div className="brand"><span className="brand-icon">W</span> Web Performance Analyzer</div>
        <span className="stage">Курсовая работа · Этап 01</span>
      </header>

      <main className="content">
        <section className="hero">
          <div className="eyebrow">Исследование скорости загрузки веб-страниц</div>
          <h1>Поймём, что замедляет сайт.</h1>
          <p className="lead">Инструмент для анализа производительности веб-страниц и подготовки рекомендаций по оптимизации.</p>
          <div className="notice">На первом этапе реализована архитектура приложения и связь React с Fastify. Запуск Lighthouse появится на следующем этапе.</div>
        </section>

        <section className="panel" aria-labelledby="server-title">
          <div>
            <div className="minor">Проверка API</div>
            <h2 id="server-title">Состояние сервера</h2>
            <p>Фронтенд выполняет настоящий HTTP-запрос к <code>/api/health</code>.</p>
          </div>
          <div className={`status status-${healthState}`} role="status">
            <span className="status-dot" />
            {healthState === 'loading' && 'Проверяем соединение…'}
            {healthState === 'online' && `Сервер подключён · v${serverVersion ?? '—'}`}
            {healthState === 'offline' && 'Сервер недоступен'}
          </div>
        </section>

        <section aria-labelledby="coming-title" className="features">
          <h2 id="coming-title">Что появится в следующих этапах</h2>
          <div className="cards">
            {plannedFeatures.map((feature, index) => (
              <article className="feature" key={feature.title}>
                <div className="feature-number">0{index + 1}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>Web Performance Analyzer · учебный проект</footer>
    </div>
  );
}

export default App;
