const API_BASE = "http://127.0.0.1:8000";

export const getMetrics = async () => {
  const response = await fetch(`${API_BASE}/metrics`);
  return response.json();
};

export const getIncidents = async () => {
  const response = await fetch(`${API_BASE}/incidents`);
  return response.json();
};

export const simulateAttack = async () => {
  const response = await fetch(`${API_BASE}/simulate-attack`);
  return response.json();
};

export const autoRemediate = async () => {
  const response = await fetch(`${API_BASE}/auto-remediate`);
  return response.json();
};

export const getCorrelations = async () => {
  const response = await fetch(
    `${API_BASE}/correlations`
  );

  return response.json();
};

export const getHeatmap = async () => {
  const response = await fetch(
    `${API_BASE}/heatmap`
  );

  return response.json();
};

export const getThreatIntel = async () => {
  const response = await fetch(
    `${API_BASE}/threat-intel`
  );

  return response.json();
};

export const getCases = async () => {
  const response = await fetch(
    `${API_BASE}/cases`
  );

  return response.json();
};

export const resolveCase = async (id) => {
  const response = await fetch(
    `${API_BASE}/resolve-case/${id}`
  );

  return response.json();
};

export const investigateCase = async (id) => {
  const res = await fetch(
    `http://127.0.0.1:8000/investigate-case/${id}`
  );

  return res.json();
};

export const escalateCase = async (id) => {
  const res = await fetch(
    `http://127.0.0.1:8000/escalate-case/${id}`
  );

  return res.json();
};

export const closeCase = async (id) => {
  const res = await fetch(
    `http://127.0.0.1:8000/close-case/${id}`
  );

  return res.json();
};