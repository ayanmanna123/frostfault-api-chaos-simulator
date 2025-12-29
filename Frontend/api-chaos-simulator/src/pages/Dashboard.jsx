import { useEffect, useState } from "react";
import api from "../api/api";
import MetricCard from "../components/MetricCard";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/analytics/summary");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">API Chaos Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Requests"
          value={stats.totalRequests}
        />
        <MetricCard
          title="Success Rate (%)"
          value={stats.successRate}
        />
        <MetricCard
          title="Avg Latency (ms)"
          value={stats.avgLatency}
        />
        <MetricCard
          title="Errors"
          value={stats.errorRequests}
        />
      </div>
    </div>
  );
}
