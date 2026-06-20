function ThreatHeatmap({ data }) {
  const entries = Object.entries(data || {}).sort((a, b) => b[1] - a[1]);

  const totalSources = entries.length;
  const totalEvents = entries.reduce((s, [, c]) => s + c, 0);

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-cyan-300 flex items-center gap-3">
            <span className="inline-block bg-gradient-to-tr from-cyan-300 to-blue-400 text-transparent bg-clip-text">🌍</span>
            <span>Threat Heatmap</span>
          </h2>
          <p className="mt-1 text-sm text-slate-400">Attack sources by geography (recent)</p>
        </div>

        <div className="flex gap-6 items-center">
          <div className="text-right">
            <div className="text-xs text-slate-400">Sources</div>
            <div className="text-lg font-bold text-white">{totalSources}</div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Events</div>
            <div className="text-lg font-bold text-cyan-400">{totalEvents}</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {entries.length === 0 ? (
          <div className="py-10 text-center text-slate-500">
            No attack sources detected
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map(([country, count]) => {
              const width = Math.min(Math.round((count / Math.max(totalEvents, 1)) * 100), 100);

              return (
                <div key={country} className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-200 truncate">{country}</div>
                      <div className="text-sm font-semibold text-cyan-300">{count}</div>
                    </div>

                    <div className="mt-2 h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-3 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

export default ThreatHeatmap;