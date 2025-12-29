import { TrendingUp, TrendingDown } from "lucide-react";

export default function MetricCard({ title, value, icon: Icon, trend, trendValue, color = "purple" }) {
  const colorClasses = {
    purple: {
      gradient: "from-purple-500/20 to-pink-500/20",
      icon: "bg-linear-to-br from-purple-500 to-pink-500",
      text: "text-purple-400",
      border: "border-purple-500/30"
    },
    blue: {
      gradient: "from-blue-500/20 to-cyan-500/20",
      icon: "bg-linear-to-br from-blue-500 to-cyan-500",
      text: "text-blue-400",
      border: "border-blue-500/30"
    },
    green: {
      gradient: "from-green-500/20 to-emerald-500/20",
      icon: "bg-linear-to-br from-green-500 to-emerald-500",
      text: "text-green-400",
      border: "border-green-500/30"
    },
    red: {
      gradient: "from-red-500/20 to-orange-500/20",
      icon: "bg-linear-to-br from-red-500 to-orange-500",
      text: "text-red-400",
      border: "border-red-500/30"
    },
    yellow: {
      gradient: "from-yellow-500/20 to-amber-500/20",
      icon: "bg-linear-to-br from-yellow-500 to-amber-500",
      text: "text-yellow-400",
      border: "border-yellow-500/30"
    }
  };

  const colors = colorClasses[color] || colorClasses.purple;

  return (
    <div className="group relative bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 overflow-hidden">
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-linear-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      {/* Decorative circle */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 bg-linear-to-br ${colors.gradient} rounded-full blur-2xl opacity-20`}></div>
      
      <div className="relative">
        {/* Header with icon */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wide">
            {title}
          </h3>
          
          {Icon && (
            <div className="relative">
              <div className={`absolute inset-0 ${colors.icon} blur-md opacity-50 rounded-lg`}></div>
              <div className={`relative ${colors.icon} p-2 rounded-lg`}>
                <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="flex items-end justify-between">
          <p className={`text-4xl font-bold ${colors.text} tracking-tight`}>
            {value}
          </p>

          {/* Trend indicator */}
          {trend && trendValue && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              trend === "up" 
                ? "bg-green-500/10 text-green-400" 
                : "bg-red-500/10 text-red-400"
            }`}>
              {trend === "up" ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span className="text-xs font-semibold">{trendValue}</span>
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${colors.gradient} rounded-b-xl opacity-50`}></div>
      </div>
    </div>
  );
}