#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);   // Change to 0x3F if LCD not working

const int MQ135_PIN = A0;
const int MQ7_PIN = A1;

void setup() {
  Serial.begin(9600);
  dht.begin();
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Smart Air Monitor");
  delay(2000);
  lcd.clear();

  Serial.println("=== Smart Air Quality & Health Risk System ===");
  Serial.println("MQ135 | MQ7 | Temperature | Humidity | AQ_Status | CO_Status");
}

String getAQStatus(int val) {
  if (val < 300) return "GOOD";
  else if (val < 500) return "MODERATE";
  else if (val < 700) return "POOR";
  else return "DANGEROUS";
}

String getCOStatus(int val) {
  if (val < 200) return "SAFE";
  else if (val < 400) return "WARNING";
  else return "DANGEROUS";
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int mq135Value = analogRead(MQ135_PIN);
  int mq7Value = analogRead(MQ7_PIN);

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("DHT sensor error!");
    delay(2000);
    return;
  }

  String aqStatus = getAQStatus(mq135Value);
  String coStatus = getCOStatus(mq7Value);

  Serial.print(mq135Value);
  Serial.print(" | ");
  Serial.print(mq7Value);
  Serial.print(" | ");
  Serial.print(temperature, 1);
  Serial.print("°C | ");
  Serial.print(humidity, 1);
  Serial.print("% | ");
  Serial.print(aqStatus);
  Serial.print(" | ");
  Serial.println(coStatus);

  // LCD Display
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("AQ:");
  lcd.print(aqStatus);
  lcd.print(" ");
  lcd.print(temperature, 1);
  lcd.print("C");

  lcd.setCursor(0, 1);
  lcd.print("H:");
  lcd.print(humidity, 1);
  lcd.print("% CO:");
  lcd.print(coStatus.substring(0, 3));

  delay(2000);
}