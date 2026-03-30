#include <DHT.h>
#include <Wire.h>
// #include <LiquidCrystal_I2C.h>

// ================== PIN DEFINITIONS ==================
#define MQ135_PIN   A0
#define MQ7_PIN     A1
#define DHTPIN      2
#define DHTTYPE     DHT22

// LCD I2C address (most common is 0x27, some are 0x3F)
// LiquidCrystal_I2C lcd(0x27, 16, 2);

// ================== CONFIGURATION ==================
#define VREF        3.3

#define PRINT_INTERVAL     3000

// Thresholds
#define MQ135_GOOD      150
#define MQ135_MODERATE  300
#define MQ135_POOR      550

#define MQ7_SAFE        150
#define MQ7_WARNING     350
#define MQ7_DANGEROUS   600
// ===================================================

DHT dht(DHTPIN, DHTTYPE);

unsigned long lastPrint = 0;
bool sensorsReady = false;

void setup() {
  Serial.begin(9600);
  while (!Serial);

  // LCD initialization skipped for Nano 33 BLE compatibility

  Serial.println(F("=============================================="));
  Serial.println(F("   SMART AIR QUALITY MONITORING SYSTEM"));
  Serial.println(F("   MQ-135 + MQ-7 + DHT22 + LCD"));
  Serial.println(F("=============================================="));

  dht.begin();
  pinMode(DHTPIN, INPUT_PULLUP);        // Important for no external resistor

  Serial.println(F("Warming up sensors (30 sec)..."));
  for (int i = 30; i > 0; i--) {
    Serial.print(i); Serial.println(F(" sec"));
    delay(1000);
  }

  sensorsReady = true;
  Serial.println(F("\nSystem Ready!\n"));
  lcd.clear();
}

void loop() {
  unsigned long currentMillis = millis();

  int rawMQ135 = analogRead(MQ135_PIN);
  int rawMQ7   = analogRead(MQ7_PIN);
  float voltMQ135 = rawMQ135 * (VREF / 1023.0);
  float voltMQ7   = rawMQ7   * (VREF / 1023.0);

  float temperature = NAN;
  float humidity = NAN;

  // Read DHT with retries
  for (int i = 0; i < 5; i++) {
    temperature = dht.readTemperature();
    humidity    = dht.readHumidity();
    if (!isnan(temperature) && !isnan(humidity)) break;
    delay(200);
  }

  // Print every 3 seconds
  if (sensorsReady && (currentMillis - lastPrint >= PRINT_INTERVAL)) {
    lastPrint = currentMillis;

    // Only print if DHT22 readings are valid
    if (!isnan(temperature) && !isnan(humidity)) {
      // Format: mq135|mq7|temperature°C|humidity%|aqStatus|coStatus\n
      String aqStatus = (rawMQ135 < MQ135_GOOD) ? "GOOD" : (rawMQ135 < MQ135_MODERATE) ? "MODERATE" : (rawMQ135 < MQ135_POOR) ? "POOR" : "DANGEROUS";
      String coStatus = (rawMQ7 < MQ7_SAFE) ? "SAFE" : (rawMQ7 < MQ7_WARNING) ? "WARNING" : "DANGEROUS";

      Serial.print(rawMQ135);
      Serial.print("|");
      Serial.print(rawMQ7);
      Serial.print("|");
      Serial.print(temperature, 1);
      Serial.print("°C|");
      Serial.print(humidity, 1);
      Serial.print("%|");
      Serial.print(aqStatus);
      Serial.print("|");
      Serial.println(coStatus);
    }

    // LCD output skipped for Nano 33 BLE compatibility
  }
}