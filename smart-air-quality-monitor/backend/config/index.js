module.exports = {
  port: 5000,
  baudRate: 9600,
  serialPort: process.env.SERIAL_PORT || '/dev/cu.usbmodem101', // Run `ls /dev/cu.*` to find Arduino port
  mlScript: '../ml/run_prediction.py',
  modelPath: '../ml/air_quality_health_risk_model.pkl'
};


