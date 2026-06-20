function CaseManagement({ cases, onResolve }) {

  const statusClass = (s) => {
    switch ((s || '').toLowerCase()) {
      case 'open':
        return 'bg-green-600/10 text-green-300 border border-green-600/20';
      case 'investigating':
        return 'bg-yellow-600/10 text-yellow-300 border border-yellow-600/20';
      case 'escalated':
        return 'bg-red-600/10 text-red-300 border border-red-600/20';
      case 'closed':
        return 'bg-slate-800 text-slate-400 border border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border border-slate-700';
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-cyan-300">🎫 SOC Case Management</h2>
        <div className="text-sm text-slate-400">{cases.length} cases</div>
      </div>

      {cases.length === 0 ? (
        <p className="text-slate-500">No active cases</p>
      ) : (
        <div className="space-y-4">
          {cases.map((c) => (
            <div
              key={c.case_id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-100 truncate">{c.case_id} — {c.title}</p>
                    <p className="mt-1 text-sm text-slate-400 truncate">Assigned: {c.assigned_to}</p>
                  </div>
                </div>
              </div>

              <div className="ml-6 flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass(c.status)}`}>{c.status}</span>

                {c.status === 'Open' && (
                  <button
                    onClick={() => onResolve(c.case_id)}
                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold hover:bg-green-500 transition-shadow focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label={`Resolve ${c.case_id}`}
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default CaseManagement;