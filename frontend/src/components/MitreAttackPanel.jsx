function MitreAttackPanel({ incidents }) {
  const MITRE_MAP = {
    "Ransomware Outbreak": {
      id: "T1486",
      name: "Data Encrypted for Impact",
    },

    "Credential Stuffing": {
      id: "T1110",
      name: "Brute Force",
    },

    "DDoS Attack": {
      id: "T1498",
      name: "Network Denial of Service",
    },

    "Privilege Escalation": {
      id: "T1068",
      name: "Exploitation for Privilege Escalation",
    },

    "Data Exfiltration": {
      id: "T1041",
      name: "Exfiltration Over C2 Channel",
    },

    "Failed Login Attempts": {
      id: "T1110",
      name: "Brute Force",
    },
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className="flex items-center gap-3 mb-6">
        <div className="h-3 w-3 rounded-full bg-cyan-400" />
        <h2 className="text-2xl font-extrabold text-cyan-300">MITRE ATT&CK Mapping</h2>
      </div>

      <div className="space-y-4">
        {(incidents || []).slice(0, 8).map((incident) => {
          const mapping = MITRE_MAP[incident.title] || { id: "T0000", name: "Unknown Technique" };

          return (
            <div key={incident.id} className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <p className="font-semibold text-white">{incident.title}</p>
                <p className="text-sm text-slate-400">{incident.severity}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-cyan-400">{mapping.id}</p>
                <p className="text-sm text-slate-400">{mapping.name}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default MitreAttackPanel;