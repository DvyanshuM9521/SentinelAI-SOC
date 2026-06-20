import { useState } from "react";

function SOARPlaybook({ incidents }) {

  const latestIncident =
    incidents?.length > 0
      ? incidents[0]
      : null;

  const getActions = (title) => {

    switch (title) {

      case "Ransomware Outbreak":
        return [
          "Isolate Host",
          "Block IOC",
          "Kill Malicious Process",
          "Start Forensics",
          "Notify SOC Team",
        ];

      case "Credential Stuffing":
        return [
          "Lock Account",
          "Force Password Reset",
          "Enable MFA",
          "Block Source IP",
          "Notify User",
        ];

      case "Data Exfiltration":
        return [
          "Disable User Account",
          "Block Outbound Traffic",
          "Start DLP Investigation",
          "Preserve Evidence",
          "Notify Security Team",
        ];

      case "Privilege Escalation":
        return [
          "Terminate Session",
          "Revoke Privileges",
          "Collect Logs",
          "Check Lateral Movement",
          "Notify Analysts",
        ];

      default:
        return [
          "Investigate Incident",
          "Collect Logs",
          "Monitor Activity",
          "Notify SOC Team",
        ];
    }
  };

  const [triggered, setTriggered] = useState(new Set());

  const toggleAction = (action) => {
    setTriggered((prev) => {
      const next = new Set(prev);
      if (next.has(action)) next.delete(action);
      else next.add(action);
      return next;
    });
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-cyan-300">⚡ SOAR Playbook Engine</h2>
        <div className="text-sm text-slate-400">Automated response recommendations</div>
      </div>

      {!latestIncident ? (

        <div className="text-slate-500 py-6">No active incident detected</div>

      ) : (

        <>
          <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-red-900/10 to-red-900/5 p-4">

            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm text-slate-400">Active Threat</p>
                <h3 className="mt-2 text-xl font-bold text-white leading-tight">{latestIncident.title}</h3>
                <p className="mt-2 text-sm">
                  <span className="inline-block mr-2 text-xs text-slate-400">Severity</span>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-red-600/10 text-red-300 border border-red-600/20">{latestIncident.severity}</span>
                </p>
              </div>

              <div className="text-sm text-slate-400 text-right">
                <div>Detected: <span className="font-medium text-white">{latestIncident.timestamp ?? '-'}</span></div>
                <div className="mt-2">Source: <span className="font-medium text-cyan-300">{latestIncident.country ?? 'Unknown'}</span></div>
              </div>
            </div>

          </div>

          <div className="mt-6">
            <h3 className="mb-4 font-semibold text-cyan-400">Recommended Actions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getActions(latestIncident.title).map((action) => {
                const isTriggered = triggered.has(action);

                return (
                  <button
                    key={action}
                    onClick={() => toggleAction(action)}
                    className={`flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 transform transition-all duration-200 hover:-translate-y-1 active:scale-95 ${isTriggered ? 'ring-2 ring-cyan-500/30' : ''}`}
                    aria-pressed={isTriggered}
                  >
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${isTriggered ? 'bg-cyan-500 text-slate-900' : 'bg-cyan-700/20 text-cyan-300'}`}>
                      {isTriggered ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      )}
                    </div>

                    <div className="text-sm text-slate-100">{action}</div>

                    {isTriggered && <div className="ml-auto text-xs text-cyan-300 font-semibold">Triggered</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </>

      )}

    </div>
  );
}

export default SOARPlaybook;