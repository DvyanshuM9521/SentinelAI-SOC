import {
  getMetrics,
  getIncidents,
  simulateAttack,
  autoRemediate,
  getCases,
  resolveCase,
} from "../services/api";
import ThreatHeatmap from "../components/ThreatHeatmap";
import { getHeatmap } from "../services/api";
import CorrelationPanel from "../components/CorrelationPanel";
import { getCorrelations } from "../services/api";
import MitreAttackPanel from "../components/MitreAttackPanel";
import { useEffect, useState } from "react";
import ThreatIntelPanel from "../components/ThreatIntelPanel";
import { getThreatIntel } from "../services/api";
import CaseManagement from "../components/CaseManagement";
import AIAnalystPanel from "../components/AIAnalystPanel";
import AIActionLog from "../components/AIActionLog";
import SecurityScoreChart from "../components/SecurityScoreChart";
import KpiCard from "../components/KpiCard";
import IncidentRow from "../components/IncidentRow";
import SectionTitle from "../components/SectionTitle";
import ThreatTrendChart from "../components/ThreatTrendChart";
import AttackTimeline from "../components/AttackTimeline";
import SOARPlaybook from "../components/SOARPlaybook";
import AnalystWorkbench from "../components/AnalystWorkbench";


function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [threatIntel, setThreatIntel] = useState([]);
  const [correlations, setCorrelations] = useState([]);
  const [heatmapData, setHeatmapData] = useState({});
  const [cases, setCases] = useState([]);
  const [scoreHistory, setScoreHistory] = useState([
    {
      time: "Start",
      score: 94,
    },
  ]);

  const loadData = async () => {
  try {
    const metricsData = await getMetrics();
    const incidentsData = await getIncidents();
    const correlationData = await getCorrelations();
    const heatmap = await getHeatmap();
    const intelData = await getThreatIntel();
    const caseData = await getCases();

setCases(
  Array.isArray(caseData)
    ? caseData
    : []
);

    setMetrics(metricsData);
    setHeatmapData(heatmap);
    setThreatIntel(
  Array.isArray(intelData)
    ? intelData
    : []
);

    setIncidents(
      Array.isArray(incidentsData)
        ? incidentsData
        : []
    );

    setCorrelations(
      Array.isArray(correlationData)
        ? correlationData
        : []
    );

  } catch (error) {
    console.error("API Error:", error);
  }
};

  useEffect(() => {
  loadData();

  const interval = setInterval(() => {
    loadData();
  }, 2000);

  return () => clearInterval(interval);
}, []);

  const handleSimulateAttack = async () => {
    try {
      await simulateAttack();

      const metricsData = await getMetrics();
      const incidentsData = await getIncidents();

      setMetrics(metricsData);

      setIncidents(
        Array.isArray(incidentsData)
          ? incidentsData
          : []
      );

      setScoreHistory((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          score: metricsData.security_score,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAutoRemediate = async () => {
    try {
      await autoRemediate();

     
  
      const metricsData = await getMetrics();
      const incidentsData = await getIncidents();

      setMetrics(metricsData);

      setIncidents(
        Array.isArray(incidentsData)
          ? incidentsData
          : []
      );

      setScoreHistory((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          score: metricsData.security_score,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleResolveCase = async (id) => {
  try {
    await resolveCase(id);
    await loadData();
  } catch (error) {
    console.error(error);
  }
};

  const score = metrics?.security_score ?? 0;

  const getStatusText = () => {
    if (score >= 80) return "Healthy";
    if (score >= 50) return "Warning";
    return "Critical";
  };

  const getStatusColor = () => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-500";
  };

  const getDotColor = () => {
    if (score >= 80) return "bg-green-400";
    if (score >= 50) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="border-b border-cyan-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-8 py-6">

  <div className="flex items-center justify-between">

    <div>

      <div className="flex items-center gap-3">

        <div className="h-4 w-4 rounded-full bg-cyan-400 animate-pulse" />

        <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          LIVE SOC
        </span>

      </div>

      <h1 className="mt-3 text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
        SentinelAI Command Center
      </h1>

      <p className="mt-2 text-slate-400">
        Enterprise Security Operations Platform
      </p>

    </div>

    <div className="flex items-center gap-4">

  <div className="
    rounded-3xl
    border
    border-cyan-500/20
    bg-cyan-500/5
    px-8
    py-5
  ">

    <p className="text-xs uppercase text-slate-400">
      Security Score
    </p>

    <p className="mt-2 text-5xl font-black text-cyan-400">
      {score}
    </p>

  </div>

  <div className="space-y-3">

    <div className="
      rounded-2xl
      border
      border-cyan-500/20
      bg-cyan-500/5
      px-5
      py-3
    ">
      <p className="text-xs uppercase text-slate-400">
        Threat Level
      </p>

      <p className={`font-bold ${getStatusColor()}`}>
        {getStatusText()}
      </p>
    </div>

    <div className="
      rounded-2xl
      border
      border-green-500/20
      bg-green-500/5
      px-5
      py-3
    ">
      <p className="text-xs uppercase text-slate-400">
        AI Status
      </p>

      <p className="font-bold text-green-400">
        Active
      </p>
    </div>

  </div>

</div>

  </div>

</header>

<div className="mt-6 flex flex-wrap gap-3">

  <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-400">
    🚨 Active Incidents: {incidents.length}
  </div>

  <div className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-yellow-400">
    🎫 Open Cases: {cases.length}
  </div>

  <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-400">
    🌍 Intel Feeds: {threatIntel.length}
  </div>

  <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-purple-400">
    🧠 Correlations: {correlations.length}
  </div>

</div>

      <main className="p-8">

        <div className="mb-8">

  <div className="rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-slate-900/40 to-slate-800/30 p-6 shadow-md">

    <div className="flex items-start justify-between gap-6">

      <div>
        <h2 className="text-4xl font-extrabold tracking-tight">
          Threat Overview
        </h2>

        <p className="mt-2 text-slate-400 max-w-xl">
          Real-time visibility into security incidents and threat activity.
        </p>

        

      </div>

      <div className="flex flex-col items-end">
        <div className="text-xs text-slate-400">Security Score</div>
        <div className="mt-1 text-4xl font-black text-cyan-400">{score}</div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSimulateAttack}
            className="rounded-xl bg-red-600 px-4 py-2 font-semibold hover:bg-red-500 transition"
          >
            Simulate
          </button>

          <button
            onClick={handleAutoRemediate}
            className="rounded-xl bg-green-600 px-4 py-2 font-semibold hover:bg-green-500 transition"
          >
            Auto Remediate
          </button>
        </div>

        <div className="mt-3 text-sm text-slate-400">
          {incidents.length} active · {cases.length} open cases
        </div>
      </div>

    </div>

  </div>

</div>



        <div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
">

          <KpiCard
            title="Critical"
            value={metrics?.critical ?? 0}
            color="#EF4444"
          />

          <KpiCard
            title="High"
            value={metrics?.high ?? 0}
            color="#F97316"
          />

          <KpiCard
            title="Medium"
            value={metrics?.medium ?? 0}
            color="#EAB308"
          />

          <KpiCard
            title="Low"
            value={metrics?.low ?? 0}
            color="#22C55E"
          />

        </div>

        <div className="mt-8">
          <ThreatTrendChart />
        </div>

        <div className="mt-8">
  <ThreatHeatmap data={heatmapData} />
</div>
        
        <div className="mt-8">
  <ThreatIntelPanel
    intel={threatIntel}
  />
</div>
        
        <div className="mt-8">
  <CaseManagement
    cases={cases}
    onResolve={handleResolveCase}
  />
</div>

        <div className="mt-8">
  <SOARPlaybook
    incidents={incidents}
  />
</div>

        <div className="mt-8">
  <AnalystWorkbench
  incidents={incidents}
  correlations={correlations}
  cases={cases}
  refreshData={loadData}
/>
</div>
        
        <div className="mt-8">
          <AIAnalystPanel incidents={incidents} />
        </div>

        <div className="mt-8">
          <AIActionLog incidents={incidents} />
        </div>
        <div className="mt-8">
          <MitreAttackPanel incidents={incidents} />
        </div>

        <div className="mt-8">
          <CorrelationPanel
  correlations={correlations}
  incidents={incidents}
/>
        </div>
        
        <div className="mt-8">
          <AttackTimeline
    incidents={incidents}
    correlations={correlations}
  />
        </div>
        
        <div className="mt-8">
          <SecurityScoreChart
            data={scoreHistory}
          />
        </div>

        <div className="mt-8">

          <div className="rounded-3xl
border
border-cyan-500/10
bg-slate-900/60
backdrop-blur-xl
p-6
shadow-[0_0_30px_rgba(34,211,238,0.05)]">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Active Incidents
              </h2>

              <span className="text-sm text-slate-400">
                {incidents.length} incidents
              </span>

            </div>

            {incidents.length === 0 ? (
              <p className="text-slate-500">
                No active incidents
              </p>
            ) : (
              incidents.map((incident) => (
                <IncidentRow
                  key={incident.id}
                  id={incident.id}
                  title={incident.title}
                  severity={incident.severity}
                />
              ))
            )}

          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;