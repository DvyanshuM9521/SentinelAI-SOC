function CorrelationPanel({ correlations, incidents }) {
  const getTechnique = (title) => {
    const mapping = {
      "Credential Stuffing": "T1110",
      "Failed Login Attempts": "T1110",
      "Privilege Escalation": "T1068",
      "Data Exfiltration": "T1041",
      "Ransomware Outbreak": "T1486",
      "DDoS Attack": "T1498",
    };

    return mapping[title] || "T0000";
  };

  if (!correlations?.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-cyan-400" />
          <h2 className="text-2xl font-extrabold text-cyan-300">SIEM Correlation Engine</h2>
        </div>

        <div className="mt-6 text-slate-500">No active correlation alerts detected.</div>
      </div>
    );
  }

  const alert = correlations[0];

  const chain = incidents
    ?.slice(0, 4)
    ?.reverse() || [];

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-cyan-400" />
          <h2 className="text-2xl font-extrabold text-cyan-300">SIEM Correlation Engine</h2>
        </div>

        <div className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-sm font-semibold text-red-400">{alert.severity}</div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-sm uppercase tracking-wider text-slate-400">Attack Chain</h3>

        <div className="flex flex-col gap-3">
          {chain.map((item, index) => (
            <div key={item.id}>
              <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="font-semibold">{item.title}</div>
                <div className="mt-1 text-xs text-slate-400">{item.timestamp}</div>
              </div>

              {index !== chain.length - 1 && <div className="ml-6 h-6 border-l-2 border-cyan-400" />}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
        <h3 className="text-lg font-bold text-red-400">AI Correlation Verdict</h3>
        <p className="mt-3 text-2xl font-bold text-white">{alert.name}</p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Confidence</span>
            <span className="font-semibold text-cyan-400">{alert.confidence}%</span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full bg-cyan-400" style={{ width: `${alert.confidence}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-sm uppercase tracking-wider text-slate-400">MITRE Attack Path</h3>

        <div className="flex flex-wrap gap-3">
          {chain.map((item) => (
            <div key={item.id} className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-cyan-400 font-semibold">{getTechnique(item.title)}</div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default CorrelationPanel;