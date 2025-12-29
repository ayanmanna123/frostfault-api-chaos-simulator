import { useEffect, useState } from "react";
import api from "../api/api";
import MetricCard from "../components/MetricCard";
import { Activity, TrendingUp, Clock, AlertCircle, BarChart3, Zap } from "lucide-react";

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
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50 rounded-full"></div>
            <div className="relative w-16 h-16 border-4 border-slate-700 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const successRate = stats.successRate ? parseFloat(stats.successRate).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50"></div>
              <div className="relative bg-linear-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <BarChart3 className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg- linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                API Chaos Dashboard
              </h1>
              <p className="text-slate-400 mt-1">Real-time analytics and performance metrics</p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Requests"
            value={stats.totalRequests?.toLocaleString() || "0"}
            icon={Activity}
            color="purple"
          />
          <MetricCard
            title="Success Rate"
            value={`${successRate}%`}
            icon={TrendingUp}
            color="green"
            trend={successRate > 95 ? "up" : "down"}
            trendValue={`${successRate}%`}
          />
          <MetricCard
            title="Avg Latency"
            value={`${stats.avgLatency || 0}ms`}
            icon={Clock}
            color="blue"
          />
          <MetricCard
            title="Error Count"
            value={stats.errorRequests?.toLocaleString() || "0"}
            icon={AlertCircle}
            color="red"
          />
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-linear-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-semibold text-white">Quick Stats</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
                <span className="text-slate-400">Successful Requests</span>
                <span className="text-green-400 font-bold">
                  {(stats.totalRequests - stats.errorRequests)?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
                <span className="text-slate-400">Failed Requests</span>
                <span className="text-red-400 font-bold">
                  {stats.errorRequests?.toLocaleString() || "0"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
                <span className="text-slate-400">Error Rate</span>
                <span className="text-yellow-400 font-bold">
                  {stats.totalRequests > 0 
                    ? ((stats.errorRequests / stats.totalRequests) * 100).toFixed(2)
                    : "0.00"}%
                </span>
              </div>
            </div>
          </div>

          {/* Performance Indicators */}
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-linear-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-semibold text-white">Performance</h2>
            </div>
            <div className="space-y-4">
              {/* Success Rate Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">Success Rate</span>
                  <span className="text-green-400 font-semibold">{successRate}%</span>
                </div>
                <div className="h-3 bg-slate-900/50 rounded-full overflow-hidden border border-slate-700/30">
                  <div 
                    className="h-full bg- linear-to-r from-green-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${successRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Error Rate Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">Error Rate</span>
                  <span className="text-red-400 font-semibold">
                    {stats.totalRequests > 0 
                      ? ((stats.errorRequests / stats.totalRequests) * 100).toFixed(1)
                      : "0.0"}%
                  </span>
                </div>
                <div className="h-3 bg-slate-900/50 rounded-full overflow-hidden border border-slate-700/30">
                  <div 
                    className="h-full bg- linear-to-r from-red-500 to-orange-500 transition-all duration-500"
                    style={{ 
                      width: `${stats.totalRequests > 0 
                        ? (stats.errorRequests / stats.totalRequests) * 100 
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Latency Indicator */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">Avg Latency</span>
                  <span className={`font-semibold ${
                    stats.avgLatency < 100 ? "text-green-400" :
                    stats.avgLatency < 500 ? "text-yellow-400" : "text-red-400"
                  }`}>
                    {stats.avgLatency || 0}ms
                  </span>
                </div>
                <div className="h-3 bg-slate-900/50 rounded-full overflow-hidden border border-slate-700/30">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      stats.avgLatency < 100 ? "bg- linear-to-r from-green-500 to-emerald-500" :
                      stats.avgLatency < 500 ? "bg- linear-to-r from-yellow-500 to-amber-500" :
                      "bg- linear-to-r from-red-500 to-orange-500"
                    }`}
                    style={{ width: `${Math.min((stats.avgLatency / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}