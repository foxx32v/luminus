# Luminus

Веб-приложение для рисования на матрице 16×16 через ESP32.

## Стек

**Client:** React, TypeScript, Vite, Zustand, Socket.IO Client, tRPC Client
**Server:** NestJS, TypeScript, tRPC, BullMQ, Prisma, PostgreSQL, Redis, Socket.IO
**Infra:** Docker Compose (PostgreSQL, Redis)

## Структура

- client/ — React + Vite
- server/ — NestJS
- docker-compose.yml
- firmware/

## Требования

- Node.js 20+
- Docker Desktop
- npm

## Запуск

### 1. Инфраструктура

docker compose up -d
- PostgreSQL (5432)
- Redis (6379).

### 2. Server

cd server
npm install
npx prisma migrate dev
npm run start:dev

- API: http://localhost:3000
- Swagger: http://localhost:3000/api

### 3. Client

cd client
npm install
npm run dev

- UI: http://localhost:5173

## Архитектура

- tRPC — типизированный канал фронт <=> сервер
- Socket.IO — real-time синхронизация матрицы
- BullMQ — очередь кадров анимации для ESP32
- Prisma + PostgreSQL — пресеты
- Redis — состояние доски + Pub/Sub

## Тесты

- Unit: логика матрицы
- Integration: tRPC-процедуры пресетов