export interface SensorData {
  timestamp: string; // ISO date string
  mq135: number; // Air quality sensor value
  mq7: number; // CO sensor value
  temperature: number; // Celsius
  humidity: number; // Percent
  aqStatus: 'GOOD' | 'MODERATE' | 'POOR' | 'DANGEROUS';
  coStatus: 'SAFE' | 'WARNING' | 'DANGEROUS';
  risk:
  'Safe' |
  'Moderate Risk' |
  'High Risk' |
  'Asthma Risk' |
  'CO Poisoning Risk' |
  'Unknown Risk' |
  'ML Error';
  eCO2?: number;
  TVOC?: number;
  dust?: number;
}