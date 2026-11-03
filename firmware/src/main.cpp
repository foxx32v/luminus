#include <Arduino.h>
#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>
#include <FastLED.h>
#include "secrets.h"

#define GRID 16
#define NUM_LEDS 256
#define DATA_PIN 5
#define LED_TYPE WS2812B
#define COLOR_ORDER GRB

CRGB leds[NUM_LEDS];
WebSocketsClient webSocket;

void drawMatrix(JsonArray matrix) {
    for (int i=0;i<NUM_LEDS&&i<matrix.size();i++) {
        uint32_t color = matrix[i];
        uint8_t r = (color >> 16) & 0xff;
        uint8_t g = (color >> 8) & 0xff;
        uint8_t b = color & 0xff;
        leds[i] = CRGB(r, g, b);
    }
    FastLED.show();
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
    if (type == WStype_TEXT) {
        String msg = String((char*)payload);
        int idx = msg.indexOf('[');
        if (idx == -1) return;
        JsonDocument doc;
        DeserializationError err = deserializeJson(doc, msg.substring(idx));
        if (err) return;
        JsonArray arr = doc.as<JsonArray>();
        if (arr.size() < 2) return;
        String event = arr[0];
        if (event == "matrix:update") {
            JsonObject data = arr[1];
            JsonArray matrix = data["matrix"];
            drawMatrix(matrix);
        }
    }
    else if (type == WStype_CONNECTED) {
        Serial.println("WS connected");
        webSocket.sendTXT("42[\"matrix:get\",{}]");
    }
    else if (type == WStype_DISCONNECTED) {
        Serial.println("WS disconnected");
    }
}

void setup() {
    Serial.begin(115200);
    FastLED.addLeds<LED_TYPE, DATA_PIN, COLOR_ORDER>(leds, NUM_LEDS);
    FastLED.setBrightness(64);
    fill_solid(leds, NUM_LEDS, CRGB::Black);
    FastLED.show();
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected");
    webSocket.begin(WS_HOST, WS_PORT, "/socket.io/?EIO=4&transport=websocket");
    webSocket.onEvent(webSocketEvent);
    webSocket.setReconnectInterval(5000);
}

void loop() {
    webSocket.loop();
}