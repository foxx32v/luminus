<div align="center" style="background: #252525">
  <img src="assets/logo.png" alt="Luminus" width="90%" />
</div>
<h2>Веб-приложение для рисования на матрице через ESP32</h2>

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
- Загрузка пользовательских картинок
- Работа в локальном и публичном режимах
- Доступен: [WebLuminus](https://luminus.tail159406.ts.net/luminus/)

## Стек

| Server | Client | Infra | Firmware | Test |
|--------|--------|-------|----------|------|
| NestJS<br>TypeScript<br>tRPC<br>Zod<br>BullMQ<br>Prisma<br>PostgreSQL<br>Redis<br>Socket.IO<br>Swagger | React<br>TypeScript<br>Vite<br>Zustand<br>Socket.IO Client<br>tRPC Client | Docker Compose<br>PostgreSQL<br>Redis<br>nginx<br>Tailscale Funnel | C++<br>Arduino<br>PlatformIO<br>FastLED<br>WebSockets<br>ArduinoJson | Unit<br>Integration |

## Структура

- `client/` — React + Vite
- `server/` — NestJS
- `firmware/` — прошивка ESP32
- `docker-compose.deploy.yml` — продакшен стек (server, client, postgres, redis)

## Архитектура

```mermaid
flowchart TD
    Client[React Client]
    Server[NestJS Server]
    DB[(PostgreSQL)]
    Redis[(Redis)]
    BullMQ[BullMQ]
    ESP32[ESP32]
    Matrix[LED Matrix 16x16]
    Client -->|WebSocket: matrix| Server
    Client -->|tRPC: presets read| Server
    Client -->|REST: presets write| Server
    Server -->|Prisma| DB
    Server -->|matrix state| Redis
    Server -->|enqueue jobs| BullMQ
    BullMQ --> Redis
    Server -->|WebSocket| ESP32
    ESP32 --> Matrix
```

## Запуск локально

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

4. Создайте `.env` из примера.

Windows PowerShell:

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

6. Откройте Docker Desktop.

7. Запустите всё из корня проекта:

```bash
npm i; npm run start
```

8. Откройте в браузере:

- Client: http://localhost:5173/luminus/
- Swagger: http://localhost:3000/api

## Деплой

1. Установите [Tailscale](https://tailscale.com/download) и включите Funnel в админке (Machines → Edit route settings → Funnel). Отключите истечение ключа машины.

2. Создайте `.env` в корне из `.env.deploy.example` и заполните:

```
POSTGRES_PASSWORD=PASSWORD
DATABASE_URL="postgresql://luminus:PASSWORD@postgres:5432/luminus?schema=public"
REDIS_HOST=cache
REDIS_PORT=6379
SERVER_PORT=3000
CORS_ORIGIN=https://<NAME_MACHINE>.<YOUR_HOST>.ts.net
```

3. Соберите и поднимите стек:

```bash
docker compose -f docker-compose.deploy.yml build
docker compose -f docker-compose.deploy.yml up -d
```

4. Залейте начальные данные:

```bash
docker compose -f docker-compose.deploy.yml run --rm api node dist/src/prisma/seed.js
```

5. Поднимите Funnel на порт web:

```bash
tailscale funnel --bg 8080
```

6. (Опционально) - Закройте служебное Basic Auth: создайте `client/.htpasswd` через [htpasswd](https://httpd.apache.org/docs/2.4/programs/htpasswd.html), добавьте `auth_basic` в `client/nginx.conf` перед `location /api` и пересоберите web.

## Прошивка ESP32

1. Установите [PlatformIO](https://platformio.org/install/ide?install=vscode) — расширение для VS Code.

2. Создайте `secrets.h` из примера.

Windows PowerShell:

```powershell
Copy-Item firmware/include/secrets.example.h firmware/include/secrets.h
```

Linux / macOS:

```bash
cp firmware/include/secrets.example.h firmware/include/secrets.h
```

3. Заполните `firmware/include/secrets.h`.

Локальная сеть:

```cpp
#define USE_TLS 0
#define WS_HOST "192.168.1.100"
#define WS_PORT 3000
```

Снаружи, через Funnel:

```cpp
#define USE_TLS 1
#define WS_HOST "..ts.net"
#define WS_PORT 443
```

`WS_HOST` для локального режима — IPv4-адрес компьютера (узнать: `ipconfig` → `IPv4-адрес`). Порт локально — `8080`, порт через Funnel — `443`.

4. Убедитесь, что вы установили необходимые драйвера, подключите ESP32 по USB и залейте прошивку:

```bash
cd firmware
pio run --target upload
```

5. Откройте Serial Monitor — должно быть `WiFi connected` и `WS connected`.

## Схема подключения

```mermaid
flowchart LR
    subgraph PSU["Блок питания 5V 5A"]
        P_PLUS["+5V"]
        P_MINUS["GND"]
    end
    subgraph ESP["ESP32 DevKit V1"]
        E_GPIO["GPIO 5"]
        E_GND["GND"]
    end
    subgraph LED["Матрица WS2812B 16×16"]
        L_VCC["VCC (+5V)"]
        L_DIN["DIN"]
        L_GND["GND"]
    end
    R["Резистор 330Ω"]
    C["Конденсатор 1000µF"]
    P_PLUS -->|"+5V"| L_VCC
    P_MINUS -->|"GND"| L_GND
    P_MINUS -->|"общая земля"| E_GND
    E_GPIO -->|"данные"| R
    R -->|"DIN"| L_DIN
    P_PLUS -.->|"+"| C
    P_MINUS -.->|"−"| C
```

## Что дальше

- Полная сборка корпуса для матрицы 16×16

## Лицензия

MIT