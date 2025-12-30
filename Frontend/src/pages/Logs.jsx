import { useEffect, useState } from "react";
import api from "../api/api";
import {
  FileText,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle2,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const limit = 10;

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/analytics/logs?page=${page}&limit=${limit}`
      );
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to load logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.method.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "success")
      return matchesSearch && log.statusCode < 400;
    if (statusFilter === "error") return matchesSearch && log.statusCode >= 400;

    return matchesSearch;
  });

  const methodColors = {
    GET: "bg-green-500/10 text-green-400 border-green-500/30",
    POST: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    PUT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/30",
    PATCH: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  };

  const getStatusColor = (status) => {
    if (status >= 500) return "text-red-400 bg-red-500/10";
    if (status >= 400) return "text-orange-400 bg-orange-500/10";
    if (status >= 300) return "text-yellow-400 bg-yellow-500/10";
    return "text-green-400 bg-green-500/10";
  };

  const getLatencyColor = (latency) => {
    if (latency > 1000) return "text-red-400";
    if (latency > 500) return "text-yellow-400";
    return "text-green-400";
  };

  const isTimeout = (log) => {
    if (!log.maxLatency) return false; // no chaos config
    return log.latency > log.maxLatency;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50"></div>
              <div className="relative bg-linear-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                <FileText className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Request Logs
              </h1>
              <p className="text-slate-400 mt-1">
                Monitor all API requests and responses
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by endpoint or method..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <div className="flex gap-2">
                  {[
                    { value: "all", label: "All", icon: Activity },
                    { value: "success", label: "Success", icon: CheckCircle2 },
                    { value: "error", label: "Errors", icon: AlertCircle },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setStatusFilter(value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        statusFilter === value
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                          : "bg-slate-900/50 border-slate-700/30 text-slate-400 hover:border-slate-600/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-slate-400">Loading logs...</p>
              </div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No logs found</p>
                <p className="text-slate-500 text-sm mt-1">
                  Try adjusting your filters
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-900/50">
                    <th className="text-left p-4 text-slate-300 font-semibold text-sm">
                      Endpoint
                    </th>
                    <th className="text-left p-4 text-slate-300 font-semibold text-sm">
                      Method
                    </th>
                    <th className="text-left p-4 text-slate-300 font-semibold text-sm">
                      Status
                    </th>
                    <th className="text-left p-4 text-slate-300 font-semibold text-sm">
                      Latency
                    </th>
                    <th className="text-left p-4 text-slate-300 font-semibold text-sm">
                      Timestamp
                    </th>
                    <th className="text-left p-4 text-slate-300 font-semibold text-sm">
                      Timeout
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <tr
                      key={log._id}
                      className={`border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors ${
                        index % 2 === 0 ? "bg-slate-900/20" : ""
                      }`}
                    >
                      <td className="p-4">
                        <code className="text-sm text-slate-300 font-mono bg-slate-900/50 px-2 py-1 rounded">
                          {log.endpoint}
                        </code>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg border text-xs font-semibold ${
                            methodColors[log.method] ||
                            "bg-slate-500/10 text-slate-400 border-slate-500/30"
                          }`}
                        >
                          {log.method}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold ${getStatusColor(
                            log.statusCode
                          )}`}
                        >
                          {log.statusCode >= 400 ? (
                            <AlertCircle className="w-3.5 h-3.5" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          )}
                          {log.statusCode}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`flex items-center gap-2 text-sm font-semibold ${getLatencyColor(
                            log.latency
                          )}`}
                        >
                          <Clock className="w-4 h-4" />
                          {log.latency}ms
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-400">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        {isTimeout(log) ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold text-red-400 bg-red-500/10">
                            <AlertCircle className="w-4 h-4" />
                            YES
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold text-green-400 bg-green-500/10">
                            <CheckCircle2 className="w-4 h-4" />
                            NO
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredLogs.length > 0 && (
          <div className="mt-6 flex items-center justify-between bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-4">
            <div className="text-sm text-slate-400">
              Showing page{" "}
              <span className="text-white font-semibold">{page}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 font-semibold">
                {page}
              </div>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={filteredLogs.length < limit}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg text-slate-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
