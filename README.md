<img src="assets/logo.png" style="width:100%" alt="Luminus" width="400" />

<h2 >Веб-приложение для рисования на матрице через ESP32.</h2>

<img src="assets/mainPage.png" alt="Главная" />

## Возможности

- Рисование на матрице 16×16 (кисть, ластик, заливка, пипетка, осветление/затемнение)
- Undo/Redo (история изменений)
- Палитра цветов с недавно использованными
- Пресеты: сохранение, загрузка, удаление
- Real-time синхронизация между вкладками через WebSocket
- Горячие клавиши: Q/W/E/R/T/Y — инструменты, Escape — закрыть меню
- Зум и панорамирование холста
- Лоадер подключения к серверу
- Изменение темы (светлая/тёмная)
- Сохранение текущей матрицы в Redis
- Покрытие Unit и Integration тестами
- Документация через Swagger
- Анимации переключения пресетов

## Стек

| Server | Client | Infra | Test |
|--------|--------|-------|------|
| NestJS<br>TypeScript<br>tRPC<br>BullMQ<br>Prisma<br>PostgreSQL<br>Redis<br>Socket.IO<br>Swagger | React<br>TypeScript<br>Vite<br>Zustand<br>Socket.IO Client<br>tRPC Client | Docker Compose<br>PostgreSQL<br>Redis | Unit<br>Integration |

## Структура

- `client/` — React + Vite
- `server/` — NestJS
- `docker-compose.yml`
- `firmware/`

## Запуск

1. Установите [Node.js 20+](https://nodejs.org/en/download), [Docker Desktop](https://www.docker.com/products/docker-desktop/) и [Git](https://git-scm.com/downloads).

2. Склонируйте репозиторий:
```bash
git clone https://github.com/foxx32v/luminus.git
cd luminus
```

3. Установите зависимости:
```bash
npm install
```

4. Создайте `.env` из примера (Windows PowerShell):
```powershell
Copy-Item server/.env.example server/.env
```
Linux / macOS:
```bash
cp server/.env.example server/.env
```

5. Проверьте, что в `server/.env` указано:
```env
SERVER_PORT=3000
DATABASE_URL="postgresql://luminus:luminus@localhost:5430/luminus?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
```

6. Запустите всё командой из корня проекта:
```bash
npm run start
```

7. Откройте в браузере:
- Client: http://localhost:5173/luminus/
- Swagger: http://localhost:3000/api

## Архитектура

```mermaid
flowchart TD
    Client[React Client] <-->|WebSocket| Server[NestJS Server]
    Client -->|tRPC / REST| Server
    Server -->|Prisma| DB[(PostgreSQL)]
    Server <-->|Pub/Sub| Redis[(Redis)]
    Server -->|Queue| BullMQ[BullMQ]
    Server <-->|WebSocket| ESP32[ESP32]
    ESP32 --> Matrix[LED Matrix 16x16]
```

## Что дальше

- Прошивка ESP32: подключение к WebSocket, отрисовка через FastLED