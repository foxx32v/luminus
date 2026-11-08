#pragma once
#define WIFI_SSID "HOT_SPOT"
#define WIFI_PASS "PASSWORD3"
#define USE_TLS 1

#if USE_TLS
#define WS_HOST "luminus.tail159406.ts.net"
#define WS_PORT 443
#else
#define WS_HOST "192.168.1.100"
#define WS_PORT 8080
#endif