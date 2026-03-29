# How to Run the Smart Air Quality Monitor System

This guide provides a robust, step-by-step process to get the entire system running locally, including Arduino, backend, frontend, and ML model.

---

## 1. Prerequisites
- **Node.js** (v18+ recommended)
- **Python** (3.8+)
- **npm** (comes with Node.js)
- **Arduino IDE** (for flashing hardware)
- **Git** (for cloning, if needed)

---

## 2. Hardware Setup
1. Connect your Arduino board to your computer.
2. Open the Arduino IDE.
3. Load the code from `arduino/SmartAirMonitor.ino`.
4. Select the correct board and port in the IDE.
5. Upload (flash) the code to your Arduino.
6. Close the Arduino Serial Monitor before running the backend.

---

## 3. Environment Variables
1. Copy `.env.example` to `.env` in the `backend/` directory.
2. Edit `.env` to set the correct `SERIAL_PORT` (e.g., `/dev/tty.usbmodemXXXX` on Mac, `COM3` on Windows).
3. (Optional) Set `PYTHON_PATH` and `ML_SCRIPT` if using custom Python or ML script locations.

---

## 4. Install Dependencies

### One-Command (Recommended)
From the `smart-air-quality-monitor/` root:
```sh
chmod +x start-dev.sh
./start-dev.sh
```
Or on Windows:
```bat
start-dev-win.bat
```

### Manual (Advanced)
Open two terminals:

**Terminal 1 (Backend):**
```sh
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```sh
cd frontend
npm install
npm run dev
```

---

## 5. Train the ML Model (Optional, for new data)
```sh
cd ml
python train_model.py
```
This will generate/update the model file used for predictions.

---

## 6. Access the Dashboard
- Open your browser to: [http://localhost:5173](http://localhost:5173) (or the port shown in the frontend terminal)
- Log in or sign up if prompted.
- View live sensor data, analytics, and health risk predictions.

---

## 7. Troubleshooting & Tips
- **Serial Port Issues:**
	- Make sure the Arduino Serial Monitor is closed.
	- Double-check the `SERIAL_PORT` in your `.env` file.
	- On Windows, use the correct `COM` port (check Device Manager).
- **ML Errors:**
	- Ensure Python and required packages are installed (`pip install -r ml/requirements.txt`).
	- Retrain the model if needed.
- **Frontend Not Updating:**
	- Make sure the backend is running and emitting data.
	- Check browser console for WebSocket errors.
- **Port Conflicts:**
	- Change the frontend/backend port in `.env` or config if needed.
- **Logs:**
	- Backend logs will show serial and ML errors in the terminal.

---

## 8. Stopping the System
- Simply close the terminal windows or press `Ctrl+C` in each.

---

For more details, see the main `README.md` and architecture docs.

