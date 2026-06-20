function AIAnalystPanel({ incidents }) {

  const criticalCount = incidents.filter(
    (i) => i.severity === "Critical"
  ).length;

  let threatLevel = "LOW";
  let color = "text-green-400";

  if (criticalCount >= 3) {
    threatLevel = "HIGH";
    color = "text-red-500";
  } else if (criticalCount >= 1) {
    threatLevel = "MEDIUM";
    color = "text-yellow-400";
  }

  // Find most frequent threat
  const threatCounts = {};

  incidents.forEach((incident) => {
    threatCounts[incident.title] =
      (threatCounts[incident.title] || 0) + 1;
  });

  const topThreat =
    Object.keys(threatCounts).length > 0
      ? Object.keys(threatCounts).reduce((a, b) =>
          threatCounts[a] > threatCounts[b] ? a : b
        )
      : "No Threats";

  const confidence =
    criticalCount >= 3
      ? "96%"
      : criticalCount >= 1
      ? "91%"
      : "87%";

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-2xl font-extrabold text-cyan-300">AI Threat Analyst</h2>
        </div>
        <div className="text-sm text-slate-400">Automated threat summary</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

        <div className="md:col-span-1 flex flex-col items-start gap-3">
          <div className="text-sm text-slate-400">Threat Level</div>

          <div className="flex items-end gap-4">
            <div className={`text-4xl md:text-5xl font-extrabold ${color}`}>{threatLevel}</div>
            <div className="text-sm text-slate-400">based on active incidents</div>
          </div>

          <div className="w-full mt-3">
            <div className="text-sm text-slate-400">Confidence</div>
            <div className="mt-2 h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-3 bg-cyan-400"
                style={{ width: confidence.replace('%', '') + '%' }}
              />
            </div>
            <div className="mt-1 text-xs text-slate-400">{confidence} confidence</div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="mb-4">
            <div className="text-sm text-slate-400">Most Active Threat</div>
            <div className="mt-2 text-lg font-semibold text-white">{topThreat}</div>
          </div>

          <div>
            <div className="text-sm text-slate-400 mb-2">Recommended Actions</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-sm">✅ Isolate affected host</div>
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-sm">✅ Block suspicious IP</div>
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-sm">✅ Run malware scan</div>
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-sm">✅ Notify SOC team</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default AIAnalystPanel;