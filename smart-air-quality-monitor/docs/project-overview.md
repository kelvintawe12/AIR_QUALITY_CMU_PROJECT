# Project Overview

Smart Air Quality Monitor is a full-stack, real-time air quality monitoring and health risk prediction system. It combines hardware sensors, Arduino, a Node.js backend, Python ML, and a modern React frontend for robust analytics and live insights.

---

## Key Features
- **Live Sensor Data:** Reads from MQ135 (air quality), MQ7 (CO), DHT22 (temperature/humidity) via Arduino.
- **ML Health Risk Prediction:** Python model predicts health risk in real time based on sensor values.
- **Backend API & WebSocket:** Node.js backend parses serial data, calls ML, and emits live data to frontend.
- **Modern Dashboard:** React + TypeScript frontend with authentication, live analytics, charts, and alerts.
- **Extensible:** Easily add new sensors, analytics, or endpoints.

---

## Data Flow
1. Sensors → Arduino: Analog/digital readings every 2s
2. Arduino → Backend: Serial string (e.g., `120|5|22.5|45|GOOD|SAFE`)
3. Backend: Parses, calls ML, emits `{ mq135, mq7, temp, hum, aqStatus, coStatus, risk }`
4. Frontend: Receives data, updates dashboard in real time

---

## Technologies Used
- Arduino (C++)
- Node.js (Express, SerialPort, Socket.io)
- Python (scikit-learn, joblib)
- React (TypeScript, Vite, Tailwind CSS)

---

## Use Cases
- Home/office air quality monitoring
- Health risk alerts for asthma/CO
- Data-driven environmental analytics

---

