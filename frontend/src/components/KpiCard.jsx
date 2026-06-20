function KpiCard({ title, value, color }) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-slate-800
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-cyan-500/30
        hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]
      "
    >
      {/* Top Glow Line */}
      <div
        className="absolute top-0 left-0 h-1 w-full"
        style={{
          background: `linear-gradient(to right, ${color}, transparent)`,
        }}
      />

      {/* Background Glow */}
      <div
        className="
          absolute
          -right-6
          top-1/2
          h-14
          w-14
          -translate-y-1/2
          rounded-full
          blur-2xl
          opacity-40
        "
        style={{
          backgroundColor: color,
        }}
      />

      {/* Title */}
      <div className="flex items-center justify-between">

        <p className="text-xs uppercase tracking-widest text-slate-400">{title}</p>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border text-xl" style={{ borderColor: `${color}40`, color }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </div>

      {/* Value */}
      <h2
        className="
          mt-5
          text-5xl
          font-black
          tracking-tight
        "
        style={{ color }}
      >
        {value}
      </h2>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">

        <span className="text-xs text-slate-500">
          LIVE METRIC
        </span>

        <div
          className="h-2 w-2 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        />

      </div>

    </div>
  );
}

export default KpiCard;