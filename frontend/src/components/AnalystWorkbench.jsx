import {
  investigateCase,
  escalateCase,
  closeCase,
} from "../services/api";

import { useState } from "react";

function AnalystWorkbench({
  incidents,
  correlations,
  cases,
  refreshData,
}) {
  const [selectedCaseId, setSelectedCaseId] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [compact, setCompact] = useState(false);

  const incident =
    incidents?.length > 0
      ? incidents[0]
      : null;

  const activeCase =
    cases?.find(
      (c) =>
        c.case_id === selectedCaseId
    ) ||
    cases?.[0];

  const getMitre = (title) => {
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

  const getStatusColor = () => {
    if (!activeCase)
      return "bg-slate-700 text-slate-300";

    switch (activeCase.status) {
      case "Open":
        return "bg-red-500/20 text-red-400";

      case "Investigating":
        return "bg-blue-500/20 text-blue-400";

      case "Escalated":
        return "bg-yellow-500/20 text-yellow-400";

      case "Closed":
        return "bg-green-500/20 text-green-400";

      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  if (!incident) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">
        <h2 className="text-2xl font-extrabold text-cyan-300">🕵 Analyst Workbench</h2>

        <p className="mt-6 text-slate-500">No active investigation</p>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 ${compact ? 'p-4' : 'p-6'}`}>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-cyan-300">🕵 Analyst Workbench</h2>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-400">Investigation panel</div>
          <button
            onClick={() => setCompact((s) => !s)}
            className="text-xs rounded-md border border-slate-700 px-2 py-1 text-slate-300"
            aria-pressed={compact}
            title="Toggle compact view"
          >
            {compact ? 'Expanded' : 'Compact'}
          </button>
        </div>
      </div>

      <div className={`mt-6 grid ${compact ? 'gap-3' : 'gap-6'} lg:grid-cols-2`}>

        {/* LEFT SIDE */}

        <div className="space-y-5">

          <div>

            <p className="mb-2 text-sm text-slate-400">
              Selected Case
            </p>

            <div className="relative">
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className={`w-full rounded-xl border border-slate-700 bg-slate-950 ${compact ? 'p-2 pr-8 text-sm' : 'p-3 pr-10 text-white'} appearance-none`}
              >
                {cases?.map((c) => (
                  <option key={c.case_id} value={c.case_id}>
                    {c.case_id} | {c.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">▾</div>
            </div>

          </div>

          <div>

            <p className="text-sm text-slate-400">
              Incident
            </p>

            <h3 className="text-xl font-semibold text-white">
              {activeCase?.title}
            </h3>

          </div>

          <div>

            <p className="text-sm text-slate-400">
              Severity
            </p>

            <p className="font-semibold text-slate-100">{activeCase?.severity}</p>

          </div>

          <div>

            <p className="text-sm text-slate-400">
              Status
            </p>

            <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor()}`}>
              {activeCase?.status}
            </span>

          </div>

          <div>

            <p className="text-sm text-slate-400">
              MITRE Technique
            </p>

            <p className="font-semibold text-cyan-400">{getMitre(activeCase?.title)}</p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-5">

          <div>

            <p className="text-sm text-slate-400">
              Evidence Collected
            </p>

            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li className="flex items-center gap-3">✓ <span>Threat Intel Match</span></li>
              <li className="flex items-center gap-3">✓ <span>IOC Identified</span></li>
              <li className="flex items-center gap-3">{correlations?.length > 0 ? '✓ Correlation Alert Active' : '✓ No Correlation Triggered'}</li>
            </ul>

          </div>

          <div>

            <p className="mb-2 text-sm text-slate-400">
              Analyst Notes
            </p>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={compact ? 3 : 6}
              className={`w-full rounded-xl border border-slate-700 bg-slate-950 ${compact ? 'p-2 text-sm' : 'p-3'} text-white`}
              placeholder="Add investigation notes..."
            />

          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={async () => {
                if (!activeCase) return;
                await investigateCase(activeCase.case_id);
                await refreshData();
              }}
              className={`rounded-md bg-blue-600 ${compact ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-sm'} font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              Investigate
            </button>

            <button
              onClick={async () => {
                if (!activeCase) return;
                await escalateCase(activeCase.case_id);
                await refreshData();
              }}
              className={`rounded-md bg-amber-600 ${compact ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-sm'} font-semibold hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400`}
            >
              Escalate
            </button>

            <button
              onClick={async () => {
                if (!activeCase) return;
                await closeCase(activeCase.case_id);
                await refreshData();
              }}
              className={`rounded-md bg-green-600 ${compact ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-sm'} font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400`}
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AnalystWorkbench;