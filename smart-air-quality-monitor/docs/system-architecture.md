# System Architecture

This document describes the real, production-ready architecture of the Smart Air Quality Monitor system, covering hardware, backend, ML, and frontend layers.

---

## 1. High-Level Flow

```
┌────────────┐    Serial    ┌────────────┐   WebSocket   ┌────────────┐   HTTP/WebSocket   ┌────────────┐
│  Sensors   │ ───────────▶ │  Arduino   │ ─────────────▶│  Backend   │ ──────────────────▶│  Frontend  │
│ (MQ135,    │              │ (Uno/Nano) │               │ (Node.js)  │                    │ (React)    │
│  MQ7,      │              └────────────┘               │  + ML      │                    └────────────┘
│  DHT22)    │                                          │ (Python)   │
└────────────┘                                          └────────────┘
```

---

## 2. Hardware Layer
- **Sensors:** MQ135 (air quality), MQ7 (CO), DHT22 (temperature/humidity)
- **Arduino:** Reads analog/digital values, formats as serial string, sends to backend

---

## 3. Backend Layer (Node.js)
- **SerialPort:** Reads sensor data from Arduino
- **Data Parsing:** Parses and validates incoming serial data
- **ML Integration:** Calls Python script for health risk prediction using live sensor values
- **WebSocket Server:** Emits real-time sensor + ML data to frontend clients
- **REST Endpoints:**
	- `/health`: Health check (status, time)
	- `/data/recent`: (Planned) Get recent sensor readings
	- `/data/export`: (Planned) Download CSV/JSON of readings
	- `/ml/retrain`: (Planned) Trigger ML retraining
	- `/system/status`: (Planned) Get backend/system status
- **Error Handling:** Robust logging for serial, ML, and WebSocket errors

---

## 4. ML Layer (Python)
- **Model:** Trained RandomForestClassifier (or similar) on synthetic/real data
- **Script:** Receives sensor values as CLI args, loads model, outputs risk prediction
- **Retraining:** `ml/train_model.py` script for new data

---

## 5. Frontend Layer (React + TypeScript)
- **WebSocket Client:** Connects to backend, receives live sensor + ML data
- **Authentication:** Login/signup, protected dashboard
- **Analytics:** Live cards, charts, risk indicators, historical stats
- **Responsive UI:** Mobile-first, modern design
- **Extensibility:** Modular components, easy to add new sensors/analytics

---

## 6. Data Flow Example
1. Sensors → Arduino: Readings every 2s (e.g., `120|5|22.5|45|GOOD|SAFE`)
2. Arduino → Backend: Serial string sent over USB
3. Backend: Parses, calls ML, emits `{ mq135, mq7, temp, hum, aqStatus, coStatus, risk }`
4. Frontend: Receives data, updates dashboard in real time

---

## 7. Security & Reliability
- Environment variables for secrets/ports
- Input validation and error handling
- Health check endpoint
- .gitignore for sensitive files

---

## 8. Extending the System
- Add new sensors: Update Arduino + backend parser + frontend types/components
- Add new endpoints: Extend backend Express app
- Add cloud sync: Push data to cloud DB from backend

---

