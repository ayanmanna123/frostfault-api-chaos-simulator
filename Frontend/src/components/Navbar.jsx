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
    <div className="flex items-center space-x-4">
        
        <div className="relative">
          {/* Main title with advanced styling */}
          <h1 className="text-3xl font-black tracking-tight relative group cursor-default">
            {/* Text shadow/glow layer */}
            <span className="absolute inset-0 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent blur-sm opacity-70">
              FrostFault
            </span>
            {/* Main text with gradient */}
            <span className="relative bg-linear-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              Frost<span className="bg-linear-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">Fault</span>
            </span>
            {/* Animated underline */}
            <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </h1>
          

          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
              <p className="text-xs font-bold text-gray-300 tracking-widest uppercase">
                Api Chaos
              </p>
            </div>
            <span className="w-1 h-1 rounded-full bg-purple-500"></span>
            <p className="text-xs font-semibold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              SIMULATOR
            </p>
          </div>
        </div>
      </div>
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
          
        </div>
      </div>
    </nav>
  );
}