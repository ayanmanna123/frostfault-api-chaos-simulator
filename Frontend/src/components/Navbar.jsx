import { Link, useLocation } from "react-router-dom";
import { Activity, Layers, Plus, FileText, Zap } from "lucide-react";
import logo from "../assets/frostfaultlogo.png";
export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Dashboard", icon: Activity },
    { path: "/mock-apis", label: "Mock APIs", icon: Layers },

    // REST
    { path: "/create", label: "Create REST", icon: Plus },

    // GRAPHQL
    { path: "/mock/create-graphql", label: "Create GraphQL", icon: Zap },

    { path: "/logs", label: "Logs", icon: FileText },
  ];

  return (
    <nav className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
 <div className="flex items-center justify-between">
  {/* LEFT: LOGO ONLY */}
  <div className="flex items-center">
    <img
      src={logo}
      alt="FrostFault"
      className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
    />
  </div>

  {/* RIGHT: NAVIGATION */}
  <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
    {navItems.map(({ path, label, icon: Icon }) => (
      <Link
        key={path}
        to={path}
        className={`
          flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg
          font-medium text-xs sm:text-sm transition-all duration-200 whitespace-nowrap
          ${
            isActive(path)
              ? "bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/20 border border-purple-500/30"
              : "text-slate-300 hover:text-white hover:bg-slate-700/50"
          }
        `}
      >
        <Icon className="w-4 h-4" strokeWidth={2} />
        <span className="hidden sm:inline">{label}</span>
      </Link>
    ))}
  </div>
</div>


      </div>
    </nav>
  );
}
