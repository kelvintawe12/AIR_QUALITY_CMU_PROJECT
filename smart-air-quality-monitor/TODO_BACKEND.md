# Smart Air Quality Monitor - Backend Implementation TODO

Status: **IN PROGRESS**  
Goal: Full backend integration (Serial → Parse → ML Predict → Status → WebSocket emit to frontend)

## Steps (Complete one by one, update status here)

### 1. [ ] Setup Dependencies & Environment
   - cd backend && npm init -y (if needed)
   - Install: express, socket.io, serialport, @types/serialport, child_process (for ML), cors, dotenv
   - Python: Ensure venv with scikit-learn, joblib, pandas (from ml/requirements.txt)
   - Copy ML model .pkl to backend/models/
   - Test: npm start should run server without errors

### 2. [ ] Update serialHandler.js
   - Read from Arduino serial port (/dev/cu.usbmodem* on mac)
   - Parse incoming lines (expect: MQ135,MQ7,temp,hum\n)
   - Emit parsed raw data event
   - Handle disconnect/reconnect
   - Test: Log parsed data

### 3. [ ] Enhance utils/dataParser.js
   - Validate/parse serial data
   - Compute thresholds: aqStatus (MQ135), coStatus (MQ7), temp/hum status
   - Thresholds from ML logic (e.g., CO>450 dangerous)
   - Return enriched data object

### 4. [ ] Integrate ML Prediction
   - Spawn predict_risk.py via child_process (pass 4 args)
   - Or node-sklearn if possible, but python subprocess reliable
   - Add 'risk' to data payload
   - Handle errors → 'Unknown Risk'
   - Cache model load

### 5. [ ] Full server.js Implementation
   - Express server on port 5000
   - Socket.IO namespace
   - On serial data → parse → ML → emit 'sensorData' matching frontend SensorData interface
   - Add /health, /api/status endpoints
   - Auth stubs if needed (frontend expects?)
   - CORS for frontend

### 6. [ ] Config & Logging
   - config/index.js: ports, thresholds, ML path
   - Winston/morgan logging
   - Env vars (.env): SERIAL_PORT, ML_MODEL_PATH

### 7. [ ] Testing & Demo Mode
   - Add demoData loop if no serial
   - Test full flow: node server.js → frontend connects → live updates
   - Simulate high-risk data
   - Export CSV endpoint?

### 8. [ ] Deployment Polish
   - Error recovery (serial disconnect)
   - Graceful shutdown
   - PM2/systemd ready

## Current Progress
- Step 1: Ready to execute

**Next Action:** Complete Step 1, then mark [x] and update file.

