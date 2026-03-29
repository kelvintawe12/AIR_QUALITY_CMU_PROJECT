require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
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
  const statusCode = 200;
  res.status(statusCode).json({ status: 'ok', time: new Date().toISOString() });
  console.log(chalk.blue(`[HTTP ${statusCode}] /health - Success`));
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

// Serial Connection with detailed logging and reconnection
let arduinoPort;
let arduinoConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY_MS = 5000;

function connectToArduino() {
  console.log(chalk.blue(`[Serial] Attempting to connect to Arduino on ${SERIAL_PORT_NAME} at ${BAUD_RATE} baud...`));
  arduinoPort = new SerialPort({ path: SERIAL_PORT_NAME, baudRate: BAUD_RATE, autoOpen: false });
  const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

  arduinoPort.open((err) => {
    if (err) {
      arduinoConnected = false;
      reconnectAttempts++;
      const statusCode = 500;
      console.error(chalk.red(`[SERIAL ERROR] [${statusCode}] Failed to open serial port: ${err.message}`));
      if (reconnectAttempts <= MAX_RECONNECT_ATTEMPTS) {
        console.log(chalk.blue(`🔄 Reconnecting in ${RECONNECT_DELAY_MS / 1000}s (Attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`));
        setTimeout(connectToArduino, RECONNECT_DELAY_MS);
      } else {
        console.error(chalk.red(`[${statusCode}] ❌ Max reconnect attempts reached. Please check your Arduino connection and SERIAL_PORT setting.`));
      }
      return;
    }
    arduinoConnected = true;
    reconnectAttempts = 0;
    const statusCode = 200;
    console.log(chalk.blue(`[SERIAL CONNECTED] [${statusCode}] Successfully connected to Arduino on ${SERIAL_PORT_NAME}`));
    io.emit('arduinoStatus', { status: 'connected', port: SERIAL_PORT_NAME, statusCode });
  });

  arduinoPort.on('close', () => {
    arduinoConnected = false;
    const statusCode = 503;
    console.warn(chalk.red(`[SERIAL CLOSED] [${statusCode}] Arduino serial port closed. Attempting to reconnect...`));
    io.emit('arduinoStatus', { status: 'disconnected', statusCode });
    setTimeout(connectToArduino, RECONNECT_DELAY_MS);
  });

  arduinoPort.on('error', (err) => {
    arduinoConnected = false;
    const statusCode = 500;
    console.error(chalk.red(`[SERIAL ERROR] [${statusCode}] Serial port error:`), chalk.red(err.message));
    io.emit('arduinoStatus', { status: 'error', message: err.message, statusCode });
  });

  parser.on('data', async (line) => {
    const dataLine = line.trim();
    if (!dataLine || !dataLine.includes('|')) return;

    const parts = dataLine.split('|').map(p => p.trim());
    if (parts.length < 6) {
      const statusCode = 400;
      console.warn(chalk.red(`[DATA WARNING] [${statusCode}] Incomplete data received:`), chalk.red(dataLine));
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

      const statusCode = 200;
      io.emit('sensorData', { ...sensorData, statusCode });
      console.log(chalk.blue(`[DATA RECEIVED] [${statusCode}] ${temperature}°C | ${humidity}% | AQ: ${aqStatus} | CO: ${coStatus} | Risk: ${risk}`));
    } catch (err) {
      const statusCode = 500;
      console.error(chalk.red(`[PROCESSING ERROR] [${statusCode}] Error processing data:`), chalk.red(err));
    }
  });
}

connectToArduino();

// WebSocket connections
io.on('connection', (socket) => {
  const statusCode = 101; // WebSocket Switching Protocols
  const backendUrl = `http://localhost:${PORT}`;
  const timestamp = new Date().toISOString();
  const clientIp = socket.handshake.address || 'unknown';
  const totalConnections = io.engine.clientsCount;
  console.log(chalk.blue(`[WS ${statusCode}] Frontend connected: ${socket.id}`));
  console.log(chalk.blue(`[Frontend Connection] Time: ${timestamp}`));
  console.log(chalk.blue(`[Frontend Connection] Client IP: ${clientIp}`));
  console.log(chalk.blue(`[Frontend Connection] WebSocket client connected on backend port: ${PORT}`));
  console.log(chalk.blue(`[Frontend Connection] Access backend at: ${backendUrl}`));
  console.log(chalk.blue(`[Frontend Connection] Total active frontend connections: ${totalConnections}`));
  socket.emit('status', { message: 'Connected to Smart Air Quality System', statusCode });
  socket.on('disconnect', () => {
    const statusCode = 1001; // WebSocket Going Away
    const disconnectTime = new Date().toISOString();
    const remainingConnections = io.engine.clientsCount - 1;
    console.log(chalk.red(`[WS ${statusCode}] Frontend disconnected: ${socket.id}`));
    console.log(chalk.red(`[Frontend Disconnection] Time: ${disconnectTime}`));
    console.log(chalk.red(`[Frontend Disconnection] Client IP: ${clientIp}`));
    console.log(chalk.red(`[Frontend Disconnection] Remaining active frontend connections: ${remainingConnections}`));
  });
});

server.listen(PORT, () => {
  console.log(chalk.blue('=============================================='));
  console.log(chalk.blue(`Backend server started successfully!`));
  console.log(chalk.blue(`Listening on:   http://localhost:${PORT}`));
  console.log(chalk.blue('----------------------------------------------'));
  console.log(chalk.blue(`ML Script:      ${ML_SCRIPT}`));
  console.log(chalk.blue(`Serial Port:    ${SERIAL_PORT_NAME} @ ${BAUD_RATE} baud`));
  console.log(chalk.blue('=============================================='));
  console.log(chalk.blue('Make sure the Arduino IDE Serial Monitor is CLOSED!'));
  console.log(chalk.blue('Set SERIAL_PORT in .env if not auto-detected.'));
});

