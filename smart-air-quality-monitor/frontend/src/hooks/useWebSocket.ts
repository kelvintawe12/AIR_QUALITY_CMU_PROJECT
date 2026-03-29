import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { SensorData } from '../types/SensorData';

export function useWebSocket(url: string) {
  const [data, setData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('reconnecting');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket: Socket = io(url, { transports: ['websocket'] });
    socketRef.current = socket;
    setStatus('reconnecting');

    socket.on('connect', () => setStatus('connected'));
    socket.on('disconnect', () => setStatus('disconnected'));
    socket.on('connect_error', () => setStatus('disconnected'));
    socket.on('sensorData', (msg: SensorData) => {
      setData(msg);
      setHistory(prev => [
        ...prev.slice(-19),
        msg
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, [url]);

  return { data, history, status };
}
