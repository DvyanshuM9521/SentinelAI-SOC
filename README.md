# SentinelAI-SOC

Enterprise-grade Security Operations Center (SOC) platform built with React and FastAPI.

SentinelAI-SOC provides real-time threat monitoring, incident investigation workflows, AI-assisted threat analysis, MITRE ATT&CK mapping, SOAR automation, and analyst-focused security operations dashboards.

---

## Features

### Security Monitoring

* Real-time incident tracking
* Security score monitoring
* Threat severity classification
* Active incident management

### Threat Intelligence

* Threat intelligence feeds
* IOC visibility
* Threat heatmap visualization
* Global attack source tracking

### Analyst Operations

* Analyst Workbench
* Investigation notes
* Evidence collection tracking
* Case management workflow

### AI-Assisted Security

* AI Threat Analyst
* Threat confidence scoring
* Automated recommendations
* AI Action Log

### Security Automation

* SOAR Playbook Engine
* Auto-remediation workflows
* Incident response recommendations

### Threat Mapping

* MITRE ATT&CK Mapping
* Attack timeline visualization
* SIEM correlation engine

---

## Architecture

Frontend:

* React
* Vite
* Recharts

Backend:

* FastAPI
* Python

---

## Project Screenshots

### Command Center
![Dashboard](screenshots/Dashboard.png)

### Threat Trend
![Threat Trend](screenshots/Threat%20Trend.png)

### Threat Heatmap
![Threat Heatmap](screenshots/Heatmap.png)

### Threat Intelligence Feed
![Threat Intelligence Feed](screenshots/Intelligence%20Feed.png)

### SOC Case Management
![SOC Case Management](screenshots/SOC%20case%20management.png)

### SOAR Playbook Engine
![SOAR Playbook Engine](screenshots/SOAR%20Playbook%20Engine.png)

### Analyst Workbench
![Analyst Workbench](screenshots/Analyst%20Workbench.png)

### AI Threat Analyst
![AI Threat Analyst](screenshots/AI%20Analysis.png)

### AI Action Log
![AI Action Log](screenshots/AI%20Action%20Log.png)

### MITRE ATT&CK Mapping
![MITRE ATT&CK Mapping](screenshots/MITRE%20Mapping.png)

### SIEM Correlation Engine
![SIEM Correlation Engine](screenshots/SIEM%20Correlation.png)

### Live Attack Timeline
![Live Attack Timeline](screenshots/Live%20Timeline.png)

### Security Score History & Active Incidents
![Security Score History & Active Incidents](screenshots/History%20%26%20Actice%20Incident.png)

---

## Run Locally

Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Future Enhancements

* Live SIEM integration
* Splunk integration
* ELK Stack integration
* AI-powered anomaly detection
* Threat intelligence API integration
* SOC alert ingestion pipeline

---

## Author

Divyanshu Mishra
