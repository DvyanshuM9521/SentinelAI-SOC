import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import { useMemo, useState, useEffect } from "react";
import { threatData } from "../data/threatData";
import { getIncidents } from "../services/api";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-md bg-slate-800/95 p-2 text-sm text-slate-100 shadow-lg">
      <div className="font-medium">{label}</div>
      <div className="text-cyan-300">Threats: {payload[0].value}</div>
    </div>
  );
}

function ThreatTrendChart() {
  const [range, setRange] = useState("7d");

  const [mounted, setMounted] = useState(false);

  const [liveData, setLiveData] = useState(() =>
    threatData.map((d) => ({ ...d }))
  );

  const data = useMemo(() => {
    if (range === "24h") return liveData.slice(-6);
    if (range === "7d") return liveData.slice(-7);
    return liveData.slice(-30);
  }, [range, liveData]);

  const latest = data[data.length - 1]?.threats ?? 0;
  const prev = data[data.length - 2]?.threats ?? latest;
  const delta = latest - prev;

  useEffect(() => {
    let mounted = true;

    const poll = async () => {
      try {
        const incidents = await getIncidents();
        if (!mounted) return;

        const now = new Date();
        const label = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const point = {
          day: label,
          threats: Array.isArray(incidents) ? incidents.length : 0,
        };

        setLiveData((prev) => {
          const next = [...prev, point];
          // keep last 30 points
          return next.slice(-30);
        });
      } catch (e) {
        // ignore polling errors
      }
    };

    // initial poll
    poll();

    const id = setInterval(poll, 2000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // analysis metrics
  const avg = useMemo(() => {
    if (data.length === 0) return 0;
    return Math.round(data.reduce((s, p) => s + p.threats, 0) / data.length);
  }, [data]);

  const peak = useMemo(() => {
    if (data.length === 0) return 0;
    return Math.max(...data.map((d) => d.threats));
  }, [data]);

  const trend = useMemo(() => {
    if (data.length < 2) return "Stable";
    const first = data[0].threats;
    const last = data[data.length - 1].threats;
    if (last > first) return "Rising";
    if (last < first) return "Falling";
    return "Stable";
  }, [data]);

  return (
    <div className="h-[360px] rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/50 p-6">

      <div className={`mb-4 flex items-start justify-between transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div>
          <h2 className="text-2xl font-extrabold">Threat Trend</h2>
          <p className="mt-1 text-sm text-slate-400">Recent trend of detected threats</p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Current</div>
          <div className="text-2xl font-black text-cyan-400">{latest}</div>
          <div className={`mt-1 text-sm ${delta >= 0 ? "text-red-400" : "text-green-400"}`}>
            {delta >= 0 ? `+${delta}` : delta} vs prev
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setRange("24h")}
            className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${range === "24h" ? "bg-slate-800 text-white scale-105" : "bg-transparent text-slate-300 border border-slate-800 hover:bg-slate-800/40"}`}
          >
            24h
          </button>

          <button
            onClick={() => setRange("7d")}
            className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${range === "7d" ? "bg-slate-800 text-white scale-105" : "bg-transparent text-slate-300 border border-slate-800 hover:bg-slate-800/40"}`}
          >
            7d
          </button>

          <button
            onClick={() => setRange("30d")}
            className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${range === "30d" ? "bg-slate-800 text-white scale-105" : "bg-transparent text-slate-300 border border-slate-800 hover:bg-slate-800/40"}`}
          >
            30d
          </button>
        </div>

        <div className="text-sm text-slate-400">Updated live</div>
      </div>

      <ResponsiveContainer width="100%" height="75%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="day" stroke="#94A3B8" />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="threats"
            stroke="#06b6d4"
            fill="url(#gradA)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ThreatTrendChart;