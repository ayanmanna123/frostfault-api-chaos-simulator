import { Link, useLocation } from "react-router-dom";
import { Activity, Layers, Plus, FileText, Zap } from "lucide-react";
import logo from "../assets/frostfaultlogo.png"

// Logo component - without background
const Logo = ({ src }) => (
  <div className="flex items-center gap-2 sm:gap-3">
    <img 
      src={src} 
      alt="FrostFault Logo" 
      className="w-8 h-8 sm:w-10 sm:h-10"
    />
    <div>
      <h1 className="text-lg sm:text-xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        FrostFault
      </h1>
      <p className="text-xs text-slate-400 hidden sm:block">Api Chaos Simulator</p>
    </div>
  </div>
);

// Status indicator component
const StatusIndicator = ({ className = "" }) => (
  <div className={`flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-500/10 border border-green-500/20 rounded-full ${className}`}>
    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    <span className="text-xs text-green-400 font-medium">Live</span>
  </div>
);

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: Activity },
    { path: "/mock-apis", label: "Mock APIs", icon: Layers },
    { path: "/create", label: "Create REST", icon: Plus },
    { path: "/mock/create-graphql", label: "Create GraphQL", icon: Zap },
    { path: "/logs", label: "Logs", icon: FileText }
  ];
  
  return (
    <nav className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          {/* Logo/Brand & Status - Horizontal on mobile */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Logo src={logo} />
            <StatusIndicator className="sm:hidden" />
          </div>
          
          {/* Navigation Links - Scrollable on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto scrollbar-hide pb-1 sm:pb-0">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm
                  transition-all duration-200 ease-in-out relative whitespace-nowrap shrink-0
                  ${isActive(path)
                    ? "bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/20 border border-purple-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
                <span className="hidden xs:inline sm:inline">{label}</span>
              </Link>
            ))}
          </div>
          
          {/* Status Indicator - Desktop position */}
          <StatusIndicator className="hidden sm:flex" />
        </div>
      </div>
    </nav>
  );
}