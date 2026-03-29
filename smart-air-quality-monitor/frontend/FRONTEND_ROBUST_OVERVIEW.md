# Smart Air Quality Monitor – Robust Frontend Architecture & Real-Time Analytics

## Overview
This document details a robust, production-ready React + TypeScript frontend for the Smart Air Quality Monitor system. It covers folder structure, authentication, real-time data flow, analytics, and the exact data types received from the backend.

---

## 1. Main Features
- **User Authentication:** Secure login/signup, protected dashboard, session management.
- **Real-Time Data:** Live updates from backend via WebSocket (socket.io-client).
- **Comprehensive Analytics:** Live cards, charts, risk indicators, historical trends, and alerting.
- **Extensible UI:** Modular components for easy expansion (add new sensors, analytics, or visualizations).
- **Type Safety:** All data and props are strongly typed with TypeScript interfaces.

---

## 2. Folder Structure (Recommended)
```
frontend/
  src/
    components/      # UI components (Dashboard, Login, Signup, Charts, Alerts, etc.)
    context/         # AuthContext, WebSocketContext
    hooks/           # useWebSocket, useAuth, useAnalytics
    styles/          # CSS/SCSS modules
    utils/           # Data formatters, helpers, types
    types/           # TypeScript interfaces and types
    App.tsx          # Main app logic and routing
    index.tsx        # Entry point
```

---

## 3. Data Type from Backend
The backend emits real-time sensor and ML prediction data via WebSocket. The expected TypeScript type is:

```ts
// src/types/SensorData.ts
export interface SensorData {
  timestamp: string; // ISO date string
  mq135: number;     // Air quality sensor value
  mq7: number;       // CO sensor value
  temperature: number; // Celsius
  humidity: number;    // Percent
  aqStatus: 'GOOD' | 'MODERATE' | 'POOR' | 'DANGEROUS';
  coStatus: 'SAFE' | 'WARNING' | 'DANGEROUS';
  risk: 'Safe' | 'Moderate Risk' | 'High Risk' | 'Asthma Risk' | 'CO Poisoning Risk' | 'Unknown Risk' | 'ML Error';
  // Optionally, add eCO2, TVOC, dust, etc. if backend provides
  eCO2?: number;
  TVOC?: number;
  dust?: number;
}
```

---

## 4. Real-Time Data Flow
1. **WebSocket Connection:**
   - The frontend connects to the backend using `socket.io-client`.
   - Listens for `sensorData` events.
2. **State Management:**
   - Stores the latest reading and a rolling window of recent readings (for charts).
   - Uses React Context or Redux for global state if needed.
3. **UI Update:**
   - All components (cards, charts, risk indicators) update instantly as new data arrives.
   - Alerts are triggered for dangerous conditions.

---

## 5. Key Components & Analytics
- **Auth Pages:** Login, Signup, and protected routes using React Context.
- **Dashboard:**
  - **Sensor Cards:** Show current values and status for each sensor (MQ135, MQ7, Temp, Humidity, etc.).
  - **Risk Indicator:** Prominent colored box for ML health risk prediction.
  - **Live Charts:**
    - Temperature, Humidity, MQ135, MQ7 (and optionally eCO2, TVOC, dust)
    - Rolling window (e.g., last 20 readings)
    - Use `recharts`, `chart.js`, or `nivo` for smooth, animated charts.
  - **Historical Analytics:**
    - Min/max/average for each metric (over last N readings or session)
    - Trend arrows (rising/falling)
    - Export to CSV option
  - **Alert Banner:**
    - Shows warnings for dangerous air quality or CO levels
    - Dismissible and color-coded
  - **Connection Status:**
    - Shows "Connected", "Reconnecting...", or "Disconnected" with color/icon
- **Navbar:**
  - App name, user info, logout button
  - Navigation links (Dashboard, Analytics, Settings)

---

## 6. Example: Real-Time Data Handling (TypeScript)
```tsx
// src/hooks/useWebSocket.ts
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SensorData } from '../types/SensorData';

export function useWebSocket(url: string) {
  const [data, setData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);
  const [status, setStatus] = useState<'connected'|'disconnected'|'reconnecting'>('disconnected');

  useEffect(() => {
    const socket: Socket = io(url);
    setStatus('reconnecting');
    socket.on('connect', () => setStatus('connected'));
    socket.on('disconnect', () => setStatus('disconnected'));
    socket.on('sensorData', (msg: SensorData) => {
      setData(msg);
      setHistory(prev => [msg, ...prev].slice(0, 20)); // keep last 20
    });
    return () => { socket.disconnect(); };
  }, [url]);

  return { data, history, status };
}
```

---

## 7. Analytics & Visualization
- **Live Cards:** Show current sensor values, status, and risk.
- **Charts:**
  - Line/area charts for each metric (last 20 readings)
  - Color-coded by risk/status
- **Historical Stats:**
  - Min, max, average, trend for each metric
- **Alerts:**
  - Show when risk is "High Risk", "CO Poisoning Risk", or "Asthma Risk"
- **Export:**
  - Button to export current session data to CSV

---

## 8. Authentication & Protected Routes
- **AuthContext:** Stores user info and login state.
- **ProtectedRoute:** Only renders dashboard if user is logged in.
- **Session:** Store in memory or localStorage as needed.

---

## 9. Error Handling & UX
- **Connection Status:** Show clear status and retry if backend is unreachable.
- **Data Validation:** Validate incoming data shape/types.
- **Fallback UI:** Show loading, error, or demo mode if no data.

---

## 10. Extending the Frontend
- Add new sensor fields (eCO2, TVOC, dust) by updating `SensorData` type and Dashboard.
- Add new analytics (e.g., air quality index, exposure time) as needed.
- Customize color schemes and layout in `styles/`.

---

## 11. Responsive Design & Mobile Support

- **Mobile-First Layout:** Use CSS Flexbox/Grid and media queries to ensure all dashboard components, charts, and cards adapt to mobile, tablet, and desktop screens.
- **Touch-Friendly UI:** Buttons, cards, and interactive elements should have adequate spacing and touch targets.
- **Chart Responsiveness:** Charts and analytics panels should resize smoothly and remain readable on small screens.
- **Navigation:** Use a collapsible sidebar or hamburger menu for navigation on mobile devices.
- **Testing:** Test UI on multiple devices and browsers to ensure consistent experience.
- **Best Practices:** Use relative units (%, rem, em), avoid fixed widths, and leverage CSS frameworks (e.g., Tailwind, Material-UI, or Bootstrap) for rapid responsive development.

---

## 12. Summary
- The frontend is a robust, modular, type-safe, and fully responsive React + TypeScript app.
- It receives and displays real-time analytics from the backend, with full authentication, error handling, and mobile support.
- The architecture is ready for production and future expansion.

---

**To implement, follow this structure, use the provided types, and build out the Dashboard and Auth flows as described.**
