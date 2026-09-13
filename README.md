# Landslide Guard

> **Monitor • Predict • Prevent**
> 
> *AI & Deep Learning Based IoT Landslide Early Warning System Using LoRa*

---

## Overview

**Landslide Guard** is a comprehensive real-time geotechnical monitoring and early warning system designed for mountainous, highway, and residential buffer zones vulnerable to rainfall-triggered and seismic slope failures.

The platform monitors subsurface and atmospheric telemetry collected by remote **ESP32** microcontroller nodes via long-range **LoRa** wireless communication, feeding deep learning models (Random Forest + LSTM / GRU recurrent networks) to calculate the geotechnical Factor of Safety (FoS) and dispatch community warnings before slope failure occurs.

---

## Frontend Tech Stack

- **React 18 / 19**
- **Vite 8** (with Rolldown production bundling)
- **Tailwind CSS** (Custom "Earth + Technology" design tokens)
- **React Router 7**
- **Lucide React** (Unified system iconography)
- **Recharts** (Interactive telemetry time-series & hazard curves)
- **Google Fonts**: Space Grotesk (Body) & Sora (Headings)

---

## Visual Identity & Design System

- **Design Philosophy**: *Earth + Technology* — blends environmental sensing, disaster management, and AI telemetry without neon cyberpunk or generic corporate admin clichés.
- **Palette**:
  - Forest Green: Geological slope vegetation, stability indicators
  - Earth Brown / Clay: Soil mechanics, bedrock parameters
  - Stone Slate: Clean card surfaces and subtle borders
  - Safety Orange: Telemetry threshold advisories
  - Warning Red: Critical hazard & evacuation sirens
- **Single-Click Theme Control**: Exactly **ONE** theme button in the header toggling between Light (Moon icon) and Dark (Sun icon) modes with `localStorage` persistence.

---

## Project Structure

```text
src/
├── assets/         # Static visual assets and icons
├── components/
│   ├── common/     # Reusable UI cards, status badges, BrandLogo
│   └── layout/     # Sidebar, Header, ThemeToggle
├── context/        # ThemeContext (single-button theme controller)
├── data/           # Geotechnical mock data, sensor metrics, alert logs
├── hooks/          # useTheme hook
├── layouts/        # AppLayout (Sidebar + Header + Page Content + Footer)
├── pages/
│   ├── Dashboard.jsx       # Operational metrics, telemetry chart, alert feed
│   ├── LiveSensors.jsx     # Piezometer, moisture, inclinometer station grid
│   ├── RiskAnalysis.jsx    # Random Forest + LSTM risk assessment & SHAP weights
│   ├── MonitoringMap.jsx   # Topographical geospatial slope monitoring viewport
│   ├── Alerts.jsx          # Early warning threshold events & siren broadcast test
│   ├── Reports.jsx         # Geotechnical compliance and stability audit reports
│   ├── Devices.jsx         # ESP32 + Semtech SX1262 LoRa transceiver inventory
│   ├── Settings.jsx        # RF frequency band, inference triggers, siren limits
│   ├── Login.jsx           # Secure civil defense operator authentication portal
│   └── NotFound.jsx        # 404 handler
├── services/       # Mock telemetry & system API service layer
├── utils/          # Formatter helpers & severity color token maps
├── App.jsx         # Application routing definition
├── index.css       # Tailwind CSS base directives & custom scrollbars
└── main.jsx        # Application bootstrap with BrowserRouter & ThemeProvider
```

---

## Available Routes

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | Redirect | Automatically navigates to `/dashboard` |
| `/login` | Operator Login | Standalone civil defense authentication screen |
| `/dashboard` | Dashboard | KPI cards, 24h displacement telemetry, safety factor |
| `/sensors` | Live Sensors | Inclinometer, pore water pressure, soil moisture cards |
| `/risk-analysis` | Risk Analysis | Random Forest & LSTM sequence model metrics |
| `/map` | Monitoring Map | Geospatial contour terrain map & LoRa node pins |
| `/alerts` | Early Warning Alerts | Active alert stream, siren broadcast test action |
| `/reports` | Reports | Geotechnical audit logs & stability report downloads |
| `/devices` | Devices | ESP32 microcontrollers, battery, RSSI & SNR signals |
| `/settings` | Settings | Frequency plans (EU868 / US915), sampling rate, FoS alarms |

---

## Development

Run local development server:

```bash
npm run dev
```

Build optimized production bundle:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```
