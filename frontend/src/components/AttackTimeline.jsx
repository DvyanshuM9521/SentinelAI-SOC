function AttackTimeline({ incidents, correlations }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse" />
          <h2 className="text-2xl font-extrabold text-red-300">Live Attack Timeline</h2>
        </div>
        <div className="text-sm text-slate-400">Latest activity from telemetry</div>
      </div>

      {(incidents || []).length === 0 ? (
        <p className="text-slate-500">No attacks detected</p>
      ) : (
        <div className="flow-root">
          <ul className="-mb-4">
            {(incidents || []).slice(0, 10).map((incident) => (
              <li key={incident.id} className="py-3">
                <div className="relative flex items-start">
                  <div className="flex w-28 items-center justify-end pr-4 text-xs text-slate-400">{incident.timestamp}</div>
                  <div className="absolute left-32 top-5 h-full w-px bg-slate-800" />
                  <div className="ml-8 mr-4 flex-shrink-0">
                    <div className="h-3 w-3 rounded-full bg-red-500 ring-4 ring-slate-900" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="rounded-md bg-slate-950 border border-slate-800 p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-white">{incident.title}</div>
                        <div className="text-sm font-semibold text-slate-400">Severity: <span className="font-bold text-white">{incident.severity}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {correlations?.length > 0 && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <h3 className="font-bold text-red-400">AI Verdict</h3>
          <p className="mt-2 text-sm text-white">{correlations[0].name}</p>
          <p className="text-xs text-slate-400">Confidence: {correlations[0].confidence}%</p>
        </div>
      )}

    </div>
  );
}

export default AttackTimeline;