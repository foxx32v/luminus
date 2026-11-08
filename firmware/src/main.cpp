#include <Arduino.h>
#include <WiFi.h>
#include <SocketIOclient.h>
#include <ArduinoJson.h>
#include <FastLED.h>
#include "secrets.h"

#define GRID 16
#define NUM_LEDS 256
#define DATA_PIN 5
#define LED_TYPE WS2812B
#define COLOR_ORDER GRB

CRGB leds[NUM_LEDS];
SocketIOclient socketIO;

void drawMatrix(JsonArray matrix) {
    for (int i = 0; i < NUM_LEDS && i < matrix.size(); i++) {
        uint32_t color = matrix[i].as<uint32_t>();
        uint8_t r = (color >> 16) & 0xff;
        uint8_t g = (color >> 8) & 0xff;
        uint8_t b = color & 0xff;
        leds[i] = CRGB(r, g, b);
    }
    FastLED.show();
}

void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
    switch (type) {
        case sIOtype_DISCONNECT: Serial.println("WS disconnected"); break;
        case sIOtype_CONNECT: Serial.println("WS connected"); socketIO.send(sIOtype_CONNECT, "/"); break;
        case sIOtype_EVENT: {
            String msg = String((char*)payload);
            int idx = msg.indexOf('[');
            if (idx == -1) break;
            JsonDocument doc;
            DeserializationError err = deserializeJson(doc, msg.substring(idx));
            if (err) break;
            JsonArray arr = doc.as<JsonArray>();
            if (arr.size() < 2) break;
            String event = arr[0];
            if (event == "matrix:update") {
                JsonObject data = arr[1];
                JsonArray matrix = data["matrix"];
                drawMatrix(matrix);
            }
            break;
        }
        default: break;
    }
}

void setup() {
    Serial.begin(115200);
    FastLED.addLeds<LED_TYPE, DATA_PIN, COLOR_ORDER>(leds, NUM_LEDS);
    FastLED.setBrightness(64);
    fill_solid(leds, NUM_LEDS, CRGB::Black);
    FastLED.show();
    WiFi.mode(WIFI_STA);
    WiFi.setSleep(false);
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected");
#if USE_TLS
    socketIO.beginSSL(WS_HOST, WS_PORT, "/socket.io/?EIO=4");
    socketIO.setExtraHeaders("Origin: https://luminus.tail159406.ts.net");
#else
    socketIO.begin(WS_HOST, WS_PORT, "/socket.io/?EIO=4");
#endif
    socketIO.onEvent(socketIOEvent);
    socketIO.setReconnectInterval(5000);
}

void loop() {
    if (WiFi.status() != WL_CONNECTED) {
        WiFi.reconnect();
        delay(1000);
        return;
    }
    socketIO.loop();
}