# Smart Air Quality Monitor

Arduino + Node.js + React + Python ML system for real-time air quality monitoring with health risk predictions.

## Structure
```
smart-air-quality-monitor/
├── arduino/
├── backend/         # Node.js serial → WebSocket
├── frontend/        # React dashboard
├── ml/             # Python RandomForest model
├── docs/
└── ...
```


## Quick Start

### 1. Prerequisites
- Node.js (v18+ recommended)
- Python 3.8+
- Arduino (hardware, flashed with code in `arduino/`)

### 2. One-Command Start (Recommended)

#### On macOS:
```sh
cd smart-air-quality-monitor
chmod +x start-dev.sh
./start-dev.sh
```

#### On Windows:
```bat
cd smart-air-quality-monitor
start-dev-win.bat
```

This will open two terminals: one for the backend, one for the frontend. Both will auto-install dependencies and start in dev mode.

### 3. Manual Start (Advanced)
1. Flash your Arduino with the code in `arduino/`.
2. In one terminal:
	```sh
	cd backend
	npm install
	npm run dev
	```
3. In another terminal:
	```sh
	cd frontend
	npm install
	npm run dev
	```
4. (Optional) Train the ML model:
	```sh
	cd ml
	python train_model.py
	```

### 4. Access the Dashboard
- Open your browser to: [http://localhost:5173](http://localhost:5173) (or the port shown in the frontend terminal)

### 5. Troubleshooting
- Ensure your Arduino is connected and not in use by the Arduino IDE.
- Set the correct `SERIAL_PORT` in `backend/.env` if needed.
- Check backend logs for serial/ML errors.

---

See `docs/how-to-run.md` for more details.

