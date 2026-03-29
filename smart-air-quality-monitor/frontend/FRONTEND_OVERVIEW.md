# Smart Air Quality Monitor – Frontend Architecture & Real-Time Data Flow

## Overview
This document explains the structure, logic, and real-time data flow of the React (TypeScript-ready) frontend for the Smart Air Quality Monitor system. It is designed for clarity, maintainability, and robust real-time analytics.

---

## 1. Main Responsibilities
- **User Authentication:** Login, signup, and protected dashboard using React Context.
- **Real-Time Data Display:** Connects to backend via WebSocket to receive live sensor and ML prediction data.
- **Analytics & Visualization:** Shows live cards, charts, and risk indicators for all air quality metrics.
- **User Experience:** Modern, responsive UI with clear status, error, and alert handling.

---

## 2. Folder Structure (Recommended)
```
frontend/
  src/
    components/      # All React UI components (Dashboard, Login, Signup, Charts, etc.)
    context/         # AuthContext for login state
    hooks/           # Custom hooks (e.g., useWebSocket)
    styles/          # CSS/SCSS files
    utils/           # Formatters, helpers
    App.tsx          # Main app logic and routing
    index.tsx        # Entry point
```

---

## 3. Real-Time Data Flow
1. **WebSocket Connection:**
   - The frontend opens a WebSocket connection to the backend (e.g., `ws://localhost:5000`).
   - Uses a custom React hook (e.g., `useWebSocket`) to manage connection, reconnection, and incoming messages.

2. **Receiving Data:**
   - Backend emits `sensorData` events with the latest readings and ML risk prediction.
   - Example payload:
     ```json
     {
       "timestamp": "2026-03-29T12:34:56Z",
       "mq135": 420,
       "mq7": 180,
       "temperature": 27.5,
       "humidity": 45.2,
       "aqStatus": "MODERATE",
       "coStatus": "SAFE",
       "risk": "Moderate Risk"
     }
     ```

3. **State Management:**
   - The frontend stores the latest data in React state (e.g., using `useState` or `useReducer`).
   - Maintains a rolling window of recent readings for live charts.

4. **UI Update:**
   - Components (cards, charts, risk indicators) automatically update as new data arrives.
   - Alerts or banners are shown for dangerous conditions (e.g., CO Poisoning Risk).

---

## 4. Key Components
- **Login/Signup:** Auth forms, protected routes, and context for user state.
- **Dashboard:**
  - **Sensor Cards:** Show current values and status for each sensor.
  - **Risk Indicator:** Big colored box for ML health risk prediction.
  - **Live Charts:** Line charts for temperature, humidity, and optionally other metrics.
  - **Alert Banner:** Shows warnings for dangerous air quality or CO levels.
- **Navbar:** Shows app name, user info, and logout button.

---

## 5. How to Connect to Backend
- The frontend uses the `socket.io-client` library to connect to the backend WebSocket server.
- Example (TypeScript):
  ```tsx
  import { useEffect } from 'react';
  import io from 'socket.io-client';

  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('sensorData', (data) => {
      // Update state with new data
    });
    return () => { socket.disconnect(); };
  }, []);
  ```
- All real-time updates are pushed from backend to frontend—no polling needed.

---

## 6. Analytics & Visualization
- **Charts:** Use libraries like `recharts`, `chart.js`, or `nivo` for live updating charts.
- **Rolling Data:** Store the last N readings (e.g., 20) for smooth chart animations.
- **Color Coding:** Use color and icons to make risk and status clear at a glance.
- **Responsiveness:** UI adapts to desktop, tablet, and mobile.

---

## 7. Authentication (Optional, for multi-user)
- Use React Context to manage login state.
- Protect dashboard routes so only logged-in users can view analytics.
- Store session in memory or localStorage as needed.

---

## 8. Error Handling & UX
- Show clear error messages if backend is unreachable or data is malformed.
- Display connection status (e.g., "Connected", "Reconnecting...").
- Fallback UI for no data or demo mode.

---

## 9. Extending the Frontend
- Add new sensor cards or analytics by updating the Dashboard component and state shape.
- Add new charts for eCO2, TVOC, or dust if backend provides these fields.
- Customize color schemes and layout in `styles/`.

---

## 10. Summary
- The frontend is a modern, real-time React app that connects to the backend via WebSocket.
- All analytics and UI update instantly as new data arrives.
- The architecture is modular, maintainable, and ready for TypeScript and future expansion.

---

**For implementation, start with the folder structure above, set up WebSocket connection, and build out the Dashboard and Auth components as described.**
