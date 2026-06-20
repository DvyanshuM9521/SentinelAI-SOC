import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SecurityScoreChart({ data }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Security Score History</h2>
        <div className="text-sm text-slate-400">Last 30 points</div>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Line type="monotone" dataKey="score" stroke="#06B6D4" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SecurityScoreChart;