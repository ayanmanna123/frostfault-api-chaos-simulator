import {
  Activity,
  Clock,
  Zap,
  ShieldAlert,
  ExternalLink,
  Copy,
  Trash2,
  GitBranch
} from "lucide-react";

export default function MockApiCard({ api, onDelete, onCopy }) {
  const isGraphQL = api.type === "GRAPHQL";

  const methodColors = {
    GET: "bg-green-500/10 text-green-400 border-green-500/30",
    POST: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    PUT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/30"
  };

  const getErrorColor = (probability) => {
    if (probability >= 0.7) return "text-red-400";
    if (probability >= 0.4) return "text-yellow-400";
    return "text-green-400";
  };

  const errorProbability = api.chaosConfig?.errorProbability || 0;
  const latencyMin = api.chaosConfig?.latency?.min || 0;
  const latencyMax = api.chaosConfig?.latency?.max || 0;
  const rateLimit = api.rateLimit?.limit || "∞";
  const rateLimitWindow = (api.rateLimit?.windowMs || 60000) / 1000;

  const displayEndpoint = isGraphQL
    ? "/mock/graphql"
    : api.endpoint;

  const displayMethod = isGraphQL ? "GRAPHQL" : api.method;

  return (
    <div className="group relative bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              {isGraphQL ? (
                <GitBranch className="w-5 h-5 text-pink-400" />
              ) : (
                <Activity className="w-5 h-5 text-purple-400" />
              )}
              {api.name}
            </h3>

            {/* Endpoint */}
            <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700/30 font-mono">
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{displayEndpoint}</span>
            </div>
          </div>

          {/* Method / Type Badge */}
          <div
            className={`px-3 py-1.5 rounded-lg border font-semibold text-sm ${
              isGraphQL
                ? "bg-pink-500/10 text-pink-400 border-pink-500/30"
                : methodColors[api.method]
            }`}
          >
            {displayMethod}
          </div>
        </div>

        {/* Chaos Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">Error Rate</span>
            </div>
            <p className={`text-lg font-bold ${getErrorColor(errorProbability)}`}>
              {(errorProbability * 100).toFixed(0)}%
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">Latency</span>
            </div>
            <p className="text-lg font-bold text-blue-400">
              {latencyMin}–{latencyMax}
              <span className="text-xs text-slate-400 ml-1">ms</span>
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">Rate Limit</span>
            </div>
            <p className="text-lg font-bold text-purple-400">
              {rateLimit}
              <span className="text-xs text-slate-400">/{rateLimitWindow}s</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-slate-700/30">
          <button
            onClick={() => onCopy?.(api)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-medium"
          >
            <Copy className="w-4 h-4" />
            Copy URL
          </button>

          <button
            onClick={() => onDelete?.(api)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
