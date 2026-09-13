# Landslide Guard - Production FastAPI Backend
import os
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .data import SYSTEM_INFO, SENSOR_NODES, ALERTS

app = FastAPI(
    title="Landslide Guard API",
    description="AI and IoT Geotechnical Monitoring System API for Himachal Pradesh, India",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Configuration
env_origins = os.getenv("ALLOWED_ORIGINS", "")
default_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000"
]

if env_origins:
    allowed_origins = [o.strip() for o in env_origins.split(",") if o.strip()]
    for orig in default_origins:
        if orig not in allowed_origins:
            allowed_origins.append(orig)
else:
    allowed_origins = default_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.onrender\.com",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["System"])
def root():
    return {
        "name": "Landslide Guard API",
        "status": "online",
        "version": "1.0.0",
        "health_check": "/api/v1/health",
        "docs": "/docs"
    }

@app.get("/api/v1/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "service": "landslide-guard-api",
        "version": "1.0.0",
        "gateway": SYSTEM_INFO["gateway_status"],
        "nodes_online": sum(1 for n in SENSOR_NODES if n["status"] == "online"),
        "nodes_total": len(SENSOR_NODES)
    }

@app.get("/api/v1/sensors", tags=["Sensors"])
def get_sensors(status: Optional[str] = None):
    if status:
        return [n for n in SENSOR_NODES if n["status"].lower() == status.lower()]
    return SENSOR_NODES

@app.get("/api/v1/sensors/summary", tags=["Sensors"])
def get_sensors_summary():
    total = len(SENSOR_NODES)
    online = sum(1 for n in SENSOR_NODES if n["status"] == "online")
    offline = total - online

    valid_moisture = [
        n["readings"]["soil_moisture"]["value"]
        for n in SENSOR_NODES
        if n["readings"]["soil_moisture"]["value"] is not None
    ]
    avg_moisture = round(sum(valid_moisture) / len(valid_moisture), 1) if valid_moisture else 0.0

    return {
        "total_nodes": total,
        "online_nodes": online,
        "offline_nodes": offline,
        "average_soil_moisture": avg_moisture,
        "highest_risk_node": "NODE-05",
        "gateway_frequency": SYSTEM_INFO["lora_frequency"]
    }

@app.get("/api/v1/sensors/{node_id}", tags=["Sensors"])
def get_sensor(node_id: str):
    target = next((n for n in SENSOR_NODES if n["id"].upper() == node_id.upper()), None)
    if not target:
        raise HTTPException(status_code=404, detail=f"Sensor node {node_id} not found")
    return target

@app.get("/api/v1/risk", tags=["Risk"])
def get_risk_overview():
    distribution = {"safe": 0, "warning": 0, "high-risk": 0, "critical": 0, "unknown": 0}
    for n in SENSOR_NODES:
        lvl = n["risk"]["level"].lower()
        if lvl in distribution:
            distribution[lvl] += 1
        else:
            distribution["unknown"] += 1

    return {
        "highest_risk_score": 68,
        "highest_risk_node": "NODE-05",
        "hazard_level": "High Risk",
        "distribution": distribution,
        "thresholds": {
            "safe": "0-25",
            "warning": ">25-50",
            "high_risk": ">50-75",
            "critical": ">75-100"
        }
    }

@app.get("/api/v1/risk/{node_id}", tags=["Risk"])
def get_node_risk(node_id: str):
    target = next((n for n in SENSOR_NODES if n["id"].upper() == node_id.upper()), None)
    if not target:
        raise HTTPException(status_code=404, detail=f"Sensor node {node_id} not found")
    return {
        "node_id": target["id"],
        "node_name": target["name"],
        "location": target["location"],
        "risk": target["risk"],
        "factors": {
            "soil_moisture": target["readings"]["soil_moisture"],
            "rainfall": target["readings"]["rainfall"],
            "tilt": target["readings"]["tilt"],
            "vibration": target["readings"]["vibration"]
        }
    }

@app.get("/api/v1/alerts", tags=["Alerts"])
def get_alerts():
    return ALERTS

@app.get("/api/v1/alerts/active", tags=["Alerts"])
def get_active_alerts():
    return [a for a in ALERTS if a["status"] == "active"]

@app.get("/api/v1/alerts/{alert_id}", tags=["Alerts"])
def get_alert(alert_id: str):
    target = next((a for a in ALERTS if a["id"].upper() == alert_id.upper()), None)
    if not target:
        raise HTTPException(status_code=404, detail=f"Alert {alert_id} not found")
    return target

@app.post("/api/v1/alerts/{alert_id}/acknowledge", tags=["Alerts"])
def acknowledge_alert(alert_id: str):
    target = next((a for a in ALERTS if a["id"].upper() == alert_id.upper()), None)
    if not target:
        raise HTTPException(status_code=404, detail=f"Alert {alert_id} not found")
    target["status"] = "acknowledged"
    return {"success": True, "message": f"Alert {alert_id} acknowledged", "alert": target}

@app.post("/api/v1/alerts/{alert_id}/resolve", tags=["Alerts"])
def resolve_alert(alert_id: str):
    target = next((a for a in ALERTS if a["id"].upper() == alert_id.upper()), None)
    if not target:
        raise HTTPException(status_code=404, detail=f"Alert {alert_id} not found")
    target["status"] = "resolved"
    return {"success": True, "message": f"Alert {alert_id} resolved", "alert": target}

@app.get("/api/v1/devices", tags=["Devices"])
def get_devices():
    return [
        {
            "node_id": n["id"],
            "name": n["name"],
            "location": n["location"]["name"],
            "status": n["status"],
            "device": n["device"]
        }
        for n in SENSOR_NODES
    ]

@app.get("/api/v1/devices/{node_id}", tags=["Devices"])
def get_device(node_id: str):
    target = next((n for n in SENSOR_NODES if n["id"].upper() == node_id.upper()), None)
    if not target:
        raise HTTPException(status_code=404, detail=f"Device {node_id} not found")
    return {
        "node_id": target["id"],
        "name": target["name"],
        "location": target["location"],
        "status": target["status"],
        "device": target["device"]
    }

@app.get("/api/v1/system/gateway", tags=["System"])
def get_system_gateway():
    return {
        "gateway_id": "LG-GW-KULLU-01",
        "location": "Beas Valley Regional Hub, HP",
        "status": SYSTEM_INFO["gateway_status"],
        "frequency": SYSTEM_INFO["lora_frequency"],
        "bandwidth": "125 kHz",
        "spreading_factor": 7,
        "active_channels": 8,
        "packets_received_today": 14820,
        "packet_loss_rate": "0.8%"
    }

@app.get("/api/v1/system/summary", tags=["System"])
def get_system_summary():
    return {
        **SYSTEM_INFO,
        "telemetry_health": "Optimal",
        "active_alerts_count": sum(1 for a in ALERTS if a["status"] == "active"),
        "active_monitoring_sector": "Himachal Pradesh Central Corridor"
    }
