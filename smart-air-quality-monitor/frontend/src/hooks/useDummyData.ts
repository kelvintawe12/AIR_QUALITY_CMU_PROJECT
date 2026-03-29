import { useState, useEffect } from 'react';
import { SensorData } from '../types/SensorData';

const HISTORY_LENGTH = 20;

// Helper to add some random walk to previous values
const fluctuate = (
val: number,
min: number,
max: number,
maxChange: number) =>
{
  const change = (Math.random() - 0.5) * 2 * maxChange;
  return Math.max(min, Math.min(max, val + change));
};

const determineAqStatus = (mq135: number): SensorData['aqStatus'] => {
  if (mq135 < 150) return 'GOOD';
  if (mq135 < 250) return 'MODERATE';
  if (mq135 < 350) return 'POOR';
  return 'DANGEROUS';
};

const determineCoStatus = (mq7: number): SensorData['coStatus'] => {
  if (mq7 < 10) return 'SAFE';
  if (mq7 < 35) return 'WARNING';
  return 'DANGEROUS';
};

const determineRisk = (
aq: SensorData['aqStatus'],
co: SensorData['coStatus'],
dust: number)
: SensorData['risk'] => {
  if (co === 'DANGEROUS') return 'CO Poisoning Risk';
  if (dust > 100 || aq === 'DANGEROUS') return 'Asthma Risk';
  if (aq === 'POOR' || co === 'WARNING') return 'High Risk';
  if (aq === 'MODERATE') return 'Moderate Risk';
  return 'Safe';
};

export function useDummyData() {
  const [data, setData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);
  const [status, setStatus] = useState<
    'connected' | 'disconnected' | 'reconnecting'>(
    'reconnecting');

  useEffect(() => {
    // Simulate connection delay
    const connectTimer = setTimeout(() => {
      setStatus('connected');
    }, 1500);

    let currentData: SensorData = {
      timestamp: new Date().toISOString(),
      mq135: 120,
      mq7: 5,
      temperature: 22.5,
      humidity: 45,
      aqStatus: 'GOOD',
      coStatus: 'SAFE',
      risk: 'Safe',
      eCO2: 450,
      TVOC: 50,
      dust: 15
    };

    // Pre-fill some history
    const initialHistory: SensorData[] = [];
    let tempTime = new Date();
    for (let i = 0; i < HISTORY_LENGTH; i++) {
      tempTime = new Date(tempTime.getTime() - 2000);
      initialHistory.unshift({
        ...currentData,
        timestamp: tempTime.toISOString()
      });
    }
    setHistory(initialHistory);
    setData(currentData);

    const interval = setInterval(() => {
      setStatus((prev) => {
        if (prev !== 'connected') return prev;

        const now = new Date().toISOString();
        const mq135 = fluctuate(currentData.mq135, 50, 500, 15);
        const mq7 = fluctuate(currentData.mq7, 0, 100, 2);
        const temperature = fluctuate(currentData.temperature, 18, 35, 0.5);
        const humidity = fluctuate(currentData.humidity, 30, 80, 1);
        const eCO2 = fluctuate(currentData.eCO2 || 400, 400, 2000, 20);
        const TVOC = fluctuate(currentData.TVOC || 0, 0, 500, 10);
        const dust = fluctuate(currentData.dust || 0, 0, 150, 5);

        const aqStatus = determineAqStatus(mq135);
        const coStatus = determineCoStatus(mq7);
        const risk = determineRisk(aqStatus, coStatus, dust);

        const newData: SensorData = {
          timestamp: now,
          mq135,
          mq7,
          temperature,
          humidity,
          aqStatus,
          coStatus,
          risk,
          eCO2,
          TVOC,
          dust
        };

        currentData = newData;
        setData(newData);
        setHistory((prevHistory) =>
        [...prevHistory, newData].slice(-HISTORY_LENGTH)
        );

        return prev;
      });
    }, 2000);

    return () => {
      clearTimeout(connectTimer);
      clearInterval(interval);
    };
  }, []);

  return { data, history, status };
}