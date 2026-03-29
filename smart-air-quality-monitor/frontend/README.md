
# Smart Air Quality Monitor – Frontend

This is the robust, production-ready frontend for the Smart Air Quality Monitor system. It is built with React and TypeScript, featuring real-time analytics, authentication, and a fully responsive design.

---

## Features
- **User Authentication:** Secure login/signup, protected dashboard.
- **Real-Time Data:** Live updates from backend via WebSocket (socket.io-client).
- **Comprehensive Analytics:** Live sensor cards, charts, risk indicators, historical stats, and alerting.
- **Responsive Design:** Mobile-first layout, touch-friendly UI, and adaptive charts.
- **Type Safety:** All data and props are strongly typed with TypeScript interfaces.

---

## Data Received from Backend
The frontend receives real-time sensor and ML prediction data via WebSocket. Example TypeScript type:

```ts
export interface SensorData {
	timestamp: string; // ISO date string
	mq135: number;
	mq7: number;
	temperature: number;
	humidity: number;
	aqStatus: 'GOOD' | 'MODERATE' | 'POOR' | 'DANGEROUS';
	coStatus: 'SAFE' | 'WARNING' | 'DANGEROUS';
	risk: 'Safe' | 'Moderate Risk' | 'High Risk' | 'Asthma Risk' | 'CO Poisoning Risk' | 'Unknown Risk' | 'ML Error';
	eCO2?: number;
	TVOC?: number;
	dust?: number;
}
```

---

## Architecture & Structure
- Modular React components for dashboard, charts, alerts, and authentication.
- Context and hooks for WebSocket, authentication, and analytics state.
- CSS/SCSS modules or UI frameworks (e.g., Tailwind, Material-UI) for responsive design.

See `FRONTEND_ROBUST_OVERVIEW.md` for a detailed architecture, data flow, and implementation guide.

---

## Getting Started
1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. The app will connect to the backend WebSocket for live data.

---

## License
MIT
