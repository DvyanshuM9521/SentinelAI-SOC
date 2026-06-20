function IncidentRow({ id, title, severity }) {
  const colors = {
    Critical: "text-red-500 bg-red-500/10",
    High: "text-orange-500 bg-orange-500/10",
    Medium: "text-yellow-400 bg-yellow-400/10",
    Low: "text-green-400 bg-green-400/10",
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-800 py-4">
      <div>
        <p className="font-semibold text-white">{id}</p>
        <p className="text-sm text-slate-400">{title}</p>
      </div>

      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${colors[severity]}`}>
        <span className="h-2 w-2 rounded-full" style={{ background: 'currentColor' }} />
        {severity}
      </span>
    </div>
  );
}

export default IncidentRow;