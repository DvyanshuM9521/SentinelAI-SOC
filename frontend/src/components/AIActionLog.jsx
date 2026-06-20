function AIActionLog({ incidents }) {

  const logs = incidents.slice(0, 5).flatMap((incident) => [
    {
      id: `${incident.id}-1`,
      time: incident.timestamp,
      message: `Threat detected: ${incident.title}`,
    },
    {
      id: `${incident.id}-2`,
      time: incident.timestamp,
      message: "AI isolated affected endpoint",
    },
    {
      id: `${incident.id}-3`,
      time: incident.timestamp,
      message: "Firewall rules updated",
    },
    {
      id: `${incident.id}-4`,
      time: incident.timestamp,
      message: "SOC team notified",
    },
  ]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-xl font-extrabold text-cyan-300">AI Action Log</h2>
        </div>
        <div className="text-sm text-slate-400">Recent automated activity</div>
      </div>

      {logs.length === 0 ? (
        <div className="py-8 text-center text-slate-500">No activity yet</div>
      ) : (
        <div className="flow-root">
          <ul className="-mb-4">
            {logs.map((log, idx) => (
              <li key={log.id} className="py-4 group">
                <div className="relative flex items-start">
                  <div className="flex h-8 w-24 items-center justify-end pr-4">
                    <div className="text-xs text-slate-400">{log.time}</div>
                  </div>

                  <div className="absolute left-28 top-6 h-full w-px bg-slate-800" />

                  <div className="ml-8 mr-4 flex-shrink-0">
                    <div className="h-3 w-3 rounded-full bg-cyan-500 ring-4 ring-slate-900" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="rounded-md bg-slate-950 border border-slate-800 p-3 text-sm text-slate-100 transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(2,6,23,0.6)]">
                      {log.message}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default AIActionLog;