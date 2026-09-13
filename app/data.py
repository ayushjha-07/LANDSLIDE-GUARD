# Landslide Guard - Canonical Data Store for FastAPI Backend

SYSTEM_INFO = {
    "app_name": "Landslide Guard",
    "tagline": "Monitor - Predict - Prevent",
    "subtitle": "AI and Deep Learning Based IoT Landslide Early Warning System Using LoRa",
    "version": "1.0.0-production",
    "gateway_status": "Online",
    "connected_nodes": 7,
    "total_nodes": 8,
    "lora_frequency": "868.1 MHz",
    "ai_model_active": "LSTM-GRU Multi-Sensor Predictor v2.4",
    "monitoring_region": "Himachal Pradesh, India (Beas Valley and Kullu-Manali Corridor)",
    "coordinates": {"lat": 32.00, "lng": 77.15}
}

SENSOR_NODES = [
    {
        "id": "NODE-01",
        "name": "Node 01",
        "location": {
            "name": "Dhauladhar West Sector",
            "latitude": 32.2200,
            "longitude": 76.4500,
            "elevation": "1,420m"
        },
        "status": "online",
        "risk": {
            "score": 18,
            "level": "safe",
            "trend": "stable",
            "prediction_window": "6h"
        },
        "readings": {
            "soil_moisture": {"value": 42.0, "unit": "%", "trend": "stable"},
            "rainfall": {"value": 12.0, "unit": "mm", "trend": "decreasing"},
            "tilt": {"value": 1.8, "unit": "deg", "trend": "stable"},
            "vibration": {"value": 0.03, "unit": "g", "trend": "stable"},
            "temperature": {"value": 21.4, "unit": "C", "trend": "stable"},
            "humidity": {"value": 72.0, "unit": "%", "trend": "stable"}
        },
        "device": {
            "controller": "ESP32",
            "communication": "LoRa 868MHz",
            "battery": 91,
            "signal_rssi": -71,
            "snr": 8.8,
            "last_seen": "Just now"
        }
    },
    {
        "id": "NODE-02",
        "name": "Node 02",
        "location": {
            "name": "Rohtang Ridge",
            "latitude": 32.3600,
            "longitude": 77.2200,
            "elevation": "3,150m"
        },
        "status": "online",
        "risk": {
            "score": 22,
            "level": "safe",
            "trend": "stable",
            "prediction_window": "6h"
        },
        "readings": {
            "soil_moisture": {"value": 48.0, "unit": "%", "trend": "stable"},
            "rainfall": {"value": 16.0, "unit": "mm", "trend": "decreasing"},
            "tilt": {"value": 2.1, "unit": "deg", "trend": "stable"},
            "vibration": {"value": 0.04, "unit": "g", "trend": "stable"},
            "temperature": {"value": 14.8, "unit": "C", "trend": "stable"},
            "humidity": {"value": 74.0, "unit": "%", "trend": "stable"}
        },
        "device": {
            "controller": "ESP32",
            "communication": "LoRa 868MHz",
            "battery": 87,
            "signal_rssi": -68,
            "snr": 9.2,
            "last_seen": "Just now"
        }
    },
    {
        "id": "NODE-03",
        "name": "Node 03",
        "location": {
            "name": "Mandi Gorge Corridor",
            "latitude": 31.6800,
            "longitude": 76.9600,
            "elevation": "980m"
        },
        "status": "online",
        "risk": {
            "score": 46,
            "level": "warning",
            "trend": "increasing",
            "prediction_window": "6h"
        },
        "readings": {
            "soil_moisture": {"value": 68.0, "unit": "%", "trend": "increasing"},
            "rainfall": {"value": 21.0, "unit": "mm", "trend": "increasing"},
            "tilt": {"value": 3.4, "unit": "deg", "trend": "increasing"},
            "vibration": {"value": 0.07, "unit": "g", "trend": "stable"},
            "temperature": {"value": 22.1, "unit": "C", "trend": "stable"},
            "humidity": {"value": 78.0, "unit": "%", "trend": "stable"}
        },
        "device": {
            "controller": "ESP32",
            "communication": "LoRa 868MHz",
            "battery": 82,
            "signal_rssi": -76,
            "snr": 7.9,
            "last_seen": "Just now"
        }
    },
    {
        "id": "NODE-04",
        "name": "Node 04",
        "location": {
            "name": "Solang Slope Beta",
            "latitude": 32.2800,
            "longitude": 77.1500,
            "elevation": "2,400m"
        },
        "status": "online",
        "risk": {
            "score": 24,
            "level": "safe",
            "trend": "stable",
            "prediction_window": "6h"
        },
        "readings": {
            "soil_moisture": {"value": 44.0, "unit": "%", "trend": "stable"},
            "rainfall": {"value": 15.0, "unit": "mm", "trend": "stable"},
            "tilt": {"value": 1.9, "unit": "deg", "trend": "stable"},
            "vibration": {"value": 0.03, "unit": "g", "trend": "stable"},
            "temperature": {"value": 17.5, "unit": "C", "trend": "stable"},
            "humidity": {"value": 70.0, "unit": "%", "trend": "stable"}
        },
        "device": {
            "controller": "ESP32",
            "communication": "LoRa 868MHz",
            "battery": 89,
            "signal_rssi": -69,
            "snr": 9.0,
            "last_seen": "Just now"
        }
    },
    {
        "id": "NODE-05",
        "name": "Node 05",
        "location": {
            "name": "Mountain Zone C",
            "latitude": 32.2417,
            "longitude": 77.1892,
            "elevation": "2,180m"
        },
        "status": "online",
        "risk": {
            "score": 68,
            "level": "high-risk",
            "trend": "increasing",
            "prediction_window": "6h"
        },
        "readings": {
            "soil_moisture": {"value": 76.0, "unit": "%", "trend": "increasing"},
            "rainfall": {"value": 29.0, "unit": "mm", "trend": "increasing"},
            "tilt": {"value": 4.8, "unit": "deg", "trend": "increasing"},
            "vibration": {"value": 0.11, "unit": "g", "trend": "increasing"},
            "temperature": {"value": 18.4, "unit": "C", "trend": "stable"},
            "humidity": {"value": 82.0, "unit": "%", "trend": "increasing"}
        },
        "device": {
            "controller": "ESP32",
            "communication": "LoRa 868MHz",
            "battery": 73,
            "signal_rssi": -82,
            "snr": 6.8,
            "last_seen": "Just now"
        }
    },
    {
        "id": "NODE-06",
        "name": "Node 06",
        "location": {
            "name": "Parvati Valley East",
            "latitude": 31.9800,
            "longitude": 77.3500,
            "elevation": "2,600m"
        },
        "status": "offline",
        "risk": {
            "score": None,
            "level": "unknown",
            "trend": "unknown",
            "prediction_window": "6h"
        },
        "readings": {
            "soil_moisture": {"value": None, "unit": "%", "trend": "unknown"},
            "rainfall": {"value": None, "unit": "mm", "trend": "unknown"},
            "tilt": {"value": None, "unit": "deg", "trend": "unknown"},
            "vibration": {"value": None, "unit": "g", "trend": "unknown"},
            "temperature": {"value": None, "unit": "C", "trend": "unknown"},
            "humidity": {"value": None, "unit": "%", "trend": "unknown"}
        },
        "device": {
            "controller": "ESP32",
            "communication": "LoRa 868MHz",
            "battery": 12,
            "signal_rssi": None,
            "snr": None,
            "last_seen": "18 minutes ago"
        }
    },
    {
        "id": "NODE-07",
        "name": "Node 07",
        "location": {
            "name": "Central Beas Sector",
            "latitude": 32.1800,
            "longitude": 77.1600,
            "elevation": "1,850m"
        },
        "status": "online",
        "risk": {
            "score": 15,
            "level": "safe",
            "trend": "stable",
            "prediction_window": "6h"
        },
        "readings": {
            "soil_moisture": {"value": 39.0, "unit": "%", "trend": "stable"},
            "rainfall": {"value": 8.0, "unit": "mm", "trend": "decreasing"},
            "tilt": {"value": 1.5, "unit": "deg", "trend": "stable"},
            "vibration": {"value": 0.02, "unit": "g", "trend": "stable"},
            "temperature": {"value": 20.2, "unit": "C", "trend": "stable"},
            "humidity": {"value": 68.0, "unit": "%", "trend": "stable"}
        },
        "device": {
            "controller": "ESP32",
            "communication": "LoRa 868MHz",
            "battery": 94,
            "signal_rssi": -65,
            "snr": 9.5,
            "last_seen": "Just now"
        }
    },
    {
        "id": "NODE-08",
        "name": "Node 08",
        "location": {
            "name": "Manali North Sector",
            "latitude": 32.2600,
            "longitude": 77.2000,
            "elevation": "2,050m"
        },
        "status": "online",
        "risk": {
            "score": 21,
            "level": "safe",
            "trend": "stable",
            "prediction_window": "6h"
        },
        "readings": {
            "soil_moisture": {"value": 45.0, "unit": "%", "trend": "stable"},
            "rainfall": {"value": 14.0, "unit": "mm", "trend": "stable"},
            "tilt": {"value": 2.0, "unit": "deg", "trend": "stable"},
            "vibration": {"value": 0.03, "unit": "g", "trend": "stable"},
            "temperature": {"value": 18.9, "unit": "C", "trend": "stable"},
            "humidity": {"value": 71.0, "unit": "%", "trend": "stable"}
        },
        "device": {
            "controller": "ESP32",
            "communication": "LoRa 868MHz",
            "battery": 88,
            "signal_rssi": -72,
            "snr": 8.7,
            "last_seen": "Just now"
        }
    }
]

ALERTS = [
    {
        "id": "ALT-104",
        "node_id": "NODE-05",
        "node_name": "Mountain Zone C",
        "severity": "high",
        "title": "Elevated Slope Instability Warning",
        "message": "Soil moisture at 76% with continuous creep acceleration (4.8 deg tilt).",
        "timestamp": "12 minutes ago",
        "status": "active",
        "risk_score": 68
    },
    {
        "id": "ALT-103",
        "node_id": "NODE-03",
        "node_name": "Mandi Gorge Corridor",
        "severity": "warning",
        "title": "Moisture Threshold Advisory",
        "message": "Saturation rate exceeded 65% following heavy precipitation.",
        "timestamp": "42 minutes ago",
        "status": "acknowledged",
        "risk_score": 46
    },
    {
        "id": "ALT-102",
        "node_id": "NODE-06",
        "node_name": "Parvati Valley East",
        "severity": "info",
        "title": "LoRa Telemetry Heartbeat Lost",
        "message": "Station telemetry timed out (>15 min) due to low battery reserve.",
        "timestamp": "18 minutes ago",
        "status": "active",
        "risk_score": None
    }
]
