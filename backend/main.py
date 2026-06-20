from random import choice, randint
from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

THREAT_INTEL = []

COUNTRIES = [
    "Russia",
    "China",
    "United States",
    "India",
    "Germany",
    "North Korea",
]

CORRELATION_RULES = [
    {
        "name": "Possible Account Takeover",
        "requires": [
            "Failed Login Attempts",
            "Privilege Escalation",
            "Data Exfiltration"
        ],
        "severity": "Critical",
        "confidence": 97
    },
    {
        "name": "Ransomware Campaign",
        "requires": [
            "Ransomware Outbreak",
            "Credential Stuffing"
        ],
        "severity": "Critical",
        "confidence": 95
    },
    {
        "name": "Reconnaissance Activity",
        "requires": [
            "Port Scan Detected",
            "Brute Force Attack"
        ],
        "severity": "Medium",
        "confidence": 84
    }
]

app = FastAPI(
    title="SentinelAI SOC API",
    version="1.0.0"
)

# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# GLOBAL STATE
# -----------------------------

security_score = 94

incident_store = []
case_store = []

# -----------------------------
# ATTACK TYPES
# -----------------------------

SIMULATED_ATTACKS = [
    ("Ransomware Outbreak", "Critical"),
    ("Data Exfiltration", "High"),
    ("Privilege Escalation", "High"),
    ("Credential Stuffing", "Medium"),
    ("DDoS Attack", "Critical"),
    ("Failed Login Attempts", "Low"),
]

def generate_ioc(title):

    if title == "Credential Stuffing":
        return {
            "type": "IP",
            "value": f"185.45.{randint(1,255)}.{randint(1,255)}",
            "reputation": "Malicious"
        }

    if title == "Data Exfiltration":
        return {
            "type": "Domain",
            "value": "steal-data.com",
            "reputation": "Suspicious"
        }

    if title == "Ransomware Outbreak":
        return {
            "type": "Hash",
            "value": f"SHA256-{randint(100000,999999)}",
            "reputation": "Malware"
        }

    return {
        "type": "CVE",
        "value": f"CVE-2026-{randint(1000,9999)}",
        "reputation": "Critical"
    }

# -----------------------------
# ROOT
# -----------------------------

@app.get("/")
def root():
    return {
        "message": "SentinelAI SOC Backend Running"
    }

# -----------------------------
# HEALTH
# -----------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "sentinelai-soc"
    }

# -----------------------------
# METRICS
# -----------------------------

@app.get("/metrics")
def metrics():

    critical = len(
        [x for x in incident_store if x["severity"] == "Critical"]
    )

    high = len(
        [x for x in incident_store if x["severity"] == "High"]
    )

    medium = len(
        [x for x in incident_store if x["severity"] == "Medium"]
    )

    low = len(
        [x for x in incident_store if x["severity"] == "Low"]
    )

    return {
        "security_score": security_score,
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low
    }

# -----------------------------
# INCIDENTS
# -----------------------------

@app.get("/incidents")
def incidents():
    return incident_store

# -----------------------------
# SIMULATE ATTACK
# -----------------------------

@app.get("/simulate-attack")
def simulate_attack():
    

    global security_score

    title, severity = choice(SIMULATED_ATTACKS)

    attack = {
    "id": f"SIM-{randint(1000,9999)}",
    "title": title,
    "severity": severity,
    "country": choice(COUNTRIES),
    "timestamp": datetime.now().strftime("%H:%M:%S")
}

    incident_store.insert(0, attack)
    case_store.insert(0, {
    "case_id": f"CASE-{randint(1000,9999)}",
    "title": attack["title"],
    "severity": attack["severity"],
    "status": "Open",
    "assigned_to": "SOC Analyst"
})
    ioc = generate_ioc(title)

    THREAT_INTEL.insert(0, ioc)

    # score impact

    if severity == "Critical":
        security_score -= 5

    elif severity == "High":
        security_score -= 3

    elif severity == "Medium":
        security_score -= 2

    else:
        security_score -= 1

    if security_score < 0:
        security_score = 0

    return attack

# -----------------------------
# AUTO REMEDIATE
# -----------------------------

@app.get("/auto-remediate")
def auto_remediate():

    global security_score

    if len(incident_store) == 0:
        return {
            "message": "No incidents to remediate"
        }

    resolved = incident_store.pop(0)

    severity = resolved["severity"]

    if severity == "Critical":
        security_score += 5

    elif severity == "High":
        security_score += 3

    elif severity == "Medium":
        security_score += 2

    else:
        security_score += 1

    if security_score > 100:
        security_score = 100

    return {
        "status": "resolved",
        "incident": resolved,
        "security_score": security_score
    }

@app.get("/correlations")
def correlations():

    if len(incident_store) < 2:
        return []

    recent = incident_store[:10]

    titles = [x["title"] for x in recent]

    alerts = []

    # Account Takeover

    if (
        titles.count("Failed Login Attempts") >= 2
        and any(
            x in titles
            for x in [
                "Privilege Escalation",
                "Data Exfiltration"
            ]
        )
    ):
        alerts.append({
            "name": "Possible Account Takeover",
            "severity": "Critical",
            "confidence": 97
        })

    # Credential Abuse

    if titles.count("Credential Stuffing") >= 3:
        alerts.append({
            "name": "Credential Abuse Campaign",
            "severity": "High",
            "confidence": 91
        })

    # Ransomware Campaign

    if titles.count("Ransomware Outbreak") >= 2:
        alerts.append({
            "name": "Ransomware Campaign",
            "severity": "Critical",
            "confidence": 95
        })

    # Data Exfiltration

    if titles.count("Data Exfiltration") >= 3:
        alerts.append({
            "name": "Mass Data Theft Activity",
            "severity": "Critical",
            "confidence": 93
        })

    # DDoS

    if titles.count("DDoS Attack") >= 2:
        alerts.append({
            "name": "Distributed Denial Of Service",
            "severity": "High",
            "confidence": 89
        })

    return alerts

@app.get("/reset-lab")
def reset_lab():

    global security_score

    incident_store.clear()

    security_score = 100

    return {
        "message": "SOC reset complete"
    }
@app.get("/heatmap")
def heatmap():

    result = {}

    for incident in incident_store:

        country = incident.get(
            "country",
            "Unknown"
        )

        result[country] = (
            result.get(country, 0) + 1
        )

    return result

@app.get("/threat-intel")
def threat_intel():
    return THREAT_INTEL[:20]

@app.get("/cases")
def get_cases():
    return case_store

@app.get("/resolve-case/{case_id}")
def resolve_case(case_id: str):

    global case_store

    case_store = [
        c for c in case_store
        if c["case_id"] != case_id
    ]

    return {
        "message": "Case Closed"
    }

@app.get("/investigate-case/{case_id}")
def investigate_case(case_id: str):

    for case in case_store:

        if case["case_id"] == case_id:
            case["status"] = "Investigating"

            return {
                "message": "Case moved to Investigating"
            }

    return {
        "message": "Case not found"
    }


@app.get("/escalate-case/{case_id}")
def escalate_case(case_id: str):

    for case in case_store:

        if case["case_id"] == case_id:
            case["status"] = "Escalated"

            return {
                "message": "Case escalated"
            }

    return {
        "message": "Case not found"
    }


@app.get("/close-case/{case_id}")
def close_case(case_id: str):

    for case in case_store:

        if case["case_id"] == case_id:
            case["status"] = "Closed"

            return {
                "message": "Case closed"
            }

    return {
        "message": "Case not found"
    }