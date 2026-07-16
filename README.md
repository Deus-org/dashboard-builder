
---

# Dashboard Builder

**Конструктор дашбордов на Next.js**  
Собирай дашборд из готовых виджетов, меняй порядок перетаскиванием и не теряй конфигурацию после перезагрузки.

[![Production](https://img.shields.io/badge/Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dashboard-builder-prod.vercel.app/)
[![Development](https://img.shields.io/badge/Development-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dashboard-builder-dev.vercel.app/)


---

## Возможности

- **Каталог виджетов** — добавление и удаление одной кнопкой  
- **Drag & Drop** — меняйте порядок мышью или с клавиатуры  
- **Автосохранение** — конфигурация в `localStorage`, восстанавливается после перезагрузки  
- **Тёмная / светлая тема** — определяется системой, выбор запоминается  
- **SSR-префетч** — данные приходят сразу в HTML, без клиентских спиннеров  
- **Два окружения** — development и production с реальными отличиями в поведении  

---

## Технологический стек

| Технология | Назначение |
|------------|------------|
| ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript) | Основа проекта, строгая типизация без `any` |
| ![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js) (App Router) | SSR, пререндер, file-based routing |
| ![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=react-query) | Серверный стейт: кэш, query keys, инвалидация, SSR-префетч |
| ![Zustand](https://img.shields.io/badge/Zustand-v5-433E38) | Клиентский стейт дашборда (persist) |
| ![SCSS](https://img.shields.io/badge/SCSS_Modules-изоляция-CC6699?logo=sass) + CSS-переменные | Стили и темизация |
| ![dnd kit](https://img.shields.io/badge/dnd--kit-DnD-FF6B6B) | Drag & Drop с a11y и клавиатурой |
| ![Recharts](https://img.shields.io/badge/Recharts-графики-22B5BF) | Визуализация данных |
| ![next-themes](https://img.shields.io/badge/next--themes-темы-000) | Переключение тем без мерцания |
| ![Vitest](https://img.shields.io/badge/Vitest-тесты-6E9F18?logo=vitest) | Unit-тесты стора и селекторов |
| **Feature-Sliced Design** | Архитектурная методология |

---

## Быстрый старт

**Требования:** Node.js ≥ 18.17, npm

```bash
npm install
npm run dev        # http://localhost:3000 (development)
```

Продакшен-сборка локально:

```bash
npm run build
npm run start
```

---

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер (`.env.development`) |
| `npm run build` / `start` | Production-сборка и запуск (`.env.production`) |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | Проверка типов TypeScript |
| `npm run test` | Unit-тесты (Vitest) |

---

## Окружения

Next.js сам подхватывает `.env.development` для `dev` и `.env.production` для `build/start`.  
Окружения реально различаются:

| Параметр | development | production |
|----------|-------------|------------|
| Баннер в UI | Показывается | Скрыт |
| Логирование | `debug` | `error` |
| React Query Devtools | Включены | Отключены |
| `refetchOnWindowFocus` | `off` | `on` |
| Namespace в `localStorage` | `…:development` | `…:production` |
| Feature flag новостей | управляется env | управляется env |

Все `NEXT_PUBLIC_*` переменные читаются централизованно через `src/shared/config/env.ts`.

---

## Архитектура (Feature-Sliced Design)

Слои импортируются строго сверху вниз:  
`app → views → widgets → features → entities → shared`

> Слой `views` не назван `pages`, чтобы избежать конфликта с Pages Router.

```bash
app/                     # Next.js App Router: layout и page
src/
  app/                   # Провайдеры (React Query, тема), глобальные стили
  views/dashboard/       # Композиция страницы + реестр виджетов
  widgets/               # app-header, env-banner, widget-catalog, dashboard-grid,
                         # products-table, products-stats, products-chart, post-news
  features/              # add-widget, remove-widget, reorder-widgets,
                         # refresh-widget-data, reset-dashboard, toggle-theme
  entities/              # dashboard (zustand store), widget (каталог и метаданные),
                         # product, post (типы, API, query-опции)
  shared/                # config/env, api/http,
                         # ui/ (кнопки, карточки, спиннеры, error-boundary),
                         # lib/ (logger, cn, форматирование)
```

### Ключевые решения

- **Реестр виджетов** лежит в `views/dashboard/model/widget-registry.tsx` — виджеты не знают друг о друге, `dashboard-grid` получает контент через `renderWidget`.
- **Публичный API** каждого слайса — `index.ts`, внешний код обращается только к нему.
- **Новый виджет** добавляется за 4 шага, не трогая чужой код:
  тип → запись в `WIDGET_CATALOG` → компонент → строка в реестре.

---

## Данные и API

Источник: **[DummyJSON](https://dummyjson.com)** — бесплатный REST API без ключа, открытый CORS.

| Виджет | Метод |
|--------|-------|
| Таблица | `GET /products?limit=8&select=title,category,price,rating,stock` |
| Статистика + График | `GET /products?limit=0&select=price,rating,category` (один общий запрос) |
| Новость | `GET /posts?limit=1` |

> Ранее использовался SpaceX API, но он был нестабилен. Благодаря изоляции в слое `entities` замена прошла безболезненно.

---

## Управление состоянием

- **Серверное** — React Query (фабрики ключей, `staleTime`, единый `QueryBoundary`, точечная инвалидация).
- **Клиентское** — Zustand (только `items: [{id, type}]`, версионирование, фильтрация старых типов).

Статистика и график используют один и тот же запрос аналитики — один HTTP-вызов, один кеш, два селектора.

---

## Серверный рендеринг (SSR)

`app/page.tsx` — серверный компонент, делает `prefetchQuery` для всех данных виджетов.  
Результат гидрации передаётся через `dehydrate` / `HydrationBoundary`.  
При недоступности API страница всё равно рендерится, виджеты покажут ошибку и повторят запрос на клиенте.

Конфигурация из `localStorage` рендерится только после монтирования (защита от рассинхрона гидратации).

---

## Тема

`next-themes` переключает `data-theme` на `<html>`.  
Цвета — только через CSS-переменные (`--surface`, `--text-muted`, `--success-soft-bg`…), никаких хардкодов.  
По умолчанию тема системная, выбор сохраняется.

---

## Надёжность

- **Error Boundary** на каждой карточке — один упавший виджет не роняет дашборд.
- Валидация сохранённой конфигурации + версионирование persist.
- Feature flag работает и для каталога, и для уже добавленных виджетов.
- HTTP-клиент: нормализация ошибок, логирование с уровнями.
- Unit-тесты: стор дашборда и селекторы аналитики.
- CI (GitHub Actions): `lint → typecheck → test → build` при пушах в `main`/`dev`.

---

## Деплой (Vercel)

Два независимых проекта из одного репозитория:

- **Production** ← ветка `main`, env из `.env.production`
- **Development** ← ветка `dev`, env из `.env.development`

На выходе — две ссылки с разным поведением окружений.

---

## Что можно улучшить

1. Проксировать API через Route Handlers Next.js (кеш, ретраи, смена источника).
2. Добавить per-widget настройки (размеры, параметры запросов).
3. Написать E2E-тесты (Playwright).
4. Поддержка i18n.
5. Улучшить доступность: явные кнопки «вверх/вниз» для скринридеров.

---
