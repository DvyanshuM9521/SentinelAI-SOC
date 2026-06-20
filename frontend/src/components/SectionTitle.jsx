function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-6 flex items-baseline justify-between">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-cyan-400" />
        <h2 className="text-2xl font-extrabold text-white">{title}</h2>
      </div>

      {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;