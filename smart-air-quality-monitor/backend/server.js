require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

// Config from env
const PORT = process.env.PORT || 5000;
const SERIAL_PORT_NAME = process.env.SERIAL_PORT || 'COM3';
const BAUD_RATE = parseInt(process.env.BAUD_RATE || '9600', 10);
const PYTHON_PATH = process.env.PYTHON_PATH || 'python';
const ML_SCRIPT = process.env.ML_SCRIPT || path.join(__dirname, '../ml/predict_risk.py');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ML prediction function
function getRiskPrediction(mq135, mq7, temp, hum) {
  return new Promise((resolve) => {
    const pythonProcess = spawn(PYTHON_PATH, [
      ML_SCRIPT,
      mq135.toString(),
      mq7.toString(),
      temp.toString(),
      hum.toString()
    ]);

    let result = '';
    let errorOutput = '';
    pythonProcess.stdout.on('data', (data) => { result += data.toString(); });
    pythonProcess.stderr.on('data', (data) => { errorOutput += data.toString(); });

    pythonProcess.on('close', (code) => {
      if (code !== 0 || errorOutput) {
        console.error(`[ML ERROR] Python exited with code ${code}. Error: ${errorOutput}`);
        resolve('ML Error');
      } else {
        resolve(result.trim() || "Unknown Risk");
      }
    });
    pythonProcess.on('error', (err) => {
      console.error('[ML ERROR] Failed to start Python process:', err);
      resolve('ML Error');
    });
  });
}

// Serial Connection
let arduinoPort;

function connectToArduino() {
  arduinoPort = new SerialPort({ path: SERIAL_PORT_NAME, baudRate: BAUD_RATE });
  const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

  arduinoPort.on('open', () => {
    console.log(`✅ Connected to Arduino on ${SERIAL_PORT_NAME}`);
  });
  arduinoPort.on('error', (err) => {
    console.error('[SERIAL ERROR] Serial port error:', err.message);
  });

  parser.on('data', async (line) => {
    const dataLine = line.trim();
    if (!dataLine || !dataLine.includes('|')) return;

    const parts = dataLine.split('|').map(p => p.trim());
    if (parts.length < 6) {
      console.warn('[DATA WARNING] Incomplete data received:', dataLine);
      return;
    }

    try {
      const mq135 = parseInt(parts[0]);
      const mq7 = parseInt(parts[1]);
      const temperature = parseFloat(parts[2].replace('°C', ''));
      const humidity = parseFloat(parts[3].replace('%', ''));
      const aqStatus = parts[4];
      const coStatus = parts[5];

      // Get REAL ML prediction
      const risk = await getRiskPrediction(mq135, mq7, temperature, humidity);

      const sensorData = {
        timestamp: new Date().toISOString(),
        mq135,
        mq7,
        temperature,
        humidity,
        aqStatus,
        coStatus,
        risk
      };

      io.emit('sensorData', sensorData);
      console.log(`[DATA] ${temperature}°C | ${humidity}% | AQ: ${aqStatus} | CO: ${coStatus} | Risk: ${risk}`);
    } catch (err) {
      console.error('[PROCESSING ERROR] Error processing data:', err);
    }
  });
}

connectToArduino();

// WebSocket connections
io.on('connection', (socket) => {
  console.log('🌐 Frontend connected:', socket.id);
  socket.emit('status', 'Connected to Smart Air Quality System');
  socket.on('disconnect', () => {
    console.log('🔌 Frontend disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Backend ready at http://localhost:${PORT}`);
  console.log('⚠️  Close Arduino IDE Serial Monitor first!');
  console.log('💡 Set SERIAL_PORT in .env if not auto-detected');
});

