<img src="./assets/logo.png" alt="Luminus" />

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

| Server | Client | Infra | Firmware | Test |
|--------|--------|-------|----------|------|
|NestJS<br>TypeScript<br>tRPC<br>Zod<br>BullMQ<br>Prisma<br>PostgreSQL<br>Redis<br>Socket.IO<br>Swagger |  React<br>TypeScript<br>Vite<br>Zustand<br>Socket.IO Client<br>tRPC Client | Docker Compose<br>PostgreSQL<br>Redis | C++<br>Arduino<br>PlatformIO<br>FastLED<br>WebSockets<br>ArduinoJson | Unit<br>Integration |

## Структура

- `client/` — React + Vite
- `server/` — NestJS
- `docker-compose.yml`
- `firmware/`

## Архитектура

```mermaid
flowchart TD
    Client[React Client] <-->|WebSocket: matrix| Server[NestJS Server]
    Client -->|tRPC: presets read| Server
    Client -->|REST: presets write| Server
    Server -->|Prisma| DB[(PostgreSQL)]
    Server <-->|matrix state| Redis[(Redis)]
    Server -->|Queue| BullMQ[BullMQ]
    Server <-->|WebSocket| ESP32[ESP32]
    ESP32 --> Matrix[LED Matrix 16x16]
```

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

6. Откройте Docker Desktop.

7. Запустите всё командой из корня проекта:
```bash
npm run start
```

8. Откройте в браузере:
- Client: http://localhost:5173/luminus/
- Swagger: http://localhost:3000/api

### Прошивка ESP32

1. Установите [PlatformIO](https://platformio.org/install/ide?install=vscode) - расширение для VS Code.

2. Создайте `secrets.h` из примера (Windows PowerShell):
```powershell
Copy-Item firmware/include/secrets.example.h firmware/include/secrets.h
```
Linux / macOS:
```bash
cp firmware/include/secrets.example.h firmware/include/secrets.h
```

3. Заполните `firmware/include/secrets.h`:
```cpp
#define WIFI_SSID "MyHotspot"
#define WIFI_PASS "password123"
#define WS_HOST "192.168.1.100"
#define WS_PORT 3000
```

`WS_HOST` — IPv4-адрес компьютера в локальной сети (узнать: `ipconfig` → `IPv4-адрес`).

4. Подключите ESP32 по USB и залейте прошивку:
```bash
cd firmware
pio run --target upload
```

5. Откройте Serial Monitor в PlatformIO - должно быть `WiFi connected` и `WS connected`.

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
- Загрузка изображений с конвертацией в матрицу
- Деплой на сервер с публичным URL

## Лицензия

MIT