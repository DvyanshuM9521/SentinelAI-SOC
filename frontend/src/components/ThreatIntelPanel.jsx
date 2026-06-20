function ThreatIntelPanel({ intel }) {

  const getColor = (rep) => {

    if (rep === "Malicious")
      return "text-red-400";

    if (rep === "Malware")
      return "text-orange-400";

    if (rep === "Suspicious")
      return "text-yellow-400";

    return "text-cyan-400";
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-cyan-300">🛡 Threat Intelligence Feed</h2>
        <div className="text-sm text-slate-400">Top indicators</div>
      </div>

      {intel.length === 0 ? (
        <p className="text-slate-500">No threat intelligence available</p>
      ) : (
        <div className="space-y-3">
          {intel.slice(0, 10).map((ioc, index) => (
            <div key={index} className="flex items-center justify-between rounded-md bg-slate-950 border border-slate-800 p-3">
              <div>
                <p className="font-semibold text-white">{ioc.type}</p>
                <p className="text-slate-400">{ioc.value}</p>
              </div>

              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getColor(ioc.reputation)} bg-white/3`}>{ioc.reputation}</div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default ThreatIntelPanel;