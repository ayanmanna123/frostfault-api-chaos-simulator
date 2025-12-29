import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import MockApiCard from "../components/MockApiCard";
import { Layers, Plus, Inbox } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function MockApis() {
  const navigate = useNavigate();
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Fetch APIs
  const fetchApis = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/mock");
      setApis(res.data);
    } catch (err) {
      console.error("Failed to load mock APIs", err);
      showNotification("Failed to load mock APIs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApis();
  }, []);

  // Show notification helper
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // ✅ COPY MOCK API URL
  const handleCopy = (apiData) => {
    const url = `http://localhost:5000/mock${apiData.endpoint}`;
    navigator.clipboard.writeText(url);
    showNotification("Mock API URL copied to clipboard!", "success");
  };

  // ✅ DELETE MOCK API
  const handleDelete = async (apiData) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${apiData.name}"? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/mock/${apiData._id}`);
      showNotification("Mock API deleted successfully", "success");
      fetchApis(); // refresh list
    } catch (err) {
      showNotification("Failed to delete mock API", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50 rounded-full"></div>
            <div className="relative w-16 h-16 border-4 border-slate-700 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-400 text-lg">Loading mock APIs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Layers className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Mock APIs
                </h1>
                <p className="text-slate-400 mt-1">
                  {apis.length} {apis.length === 1 ? "endpoint" : "endpoints"} configured
                </p>
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-purple-500/25"
            >
              <Plus className="w-5 h-5" />
              Create New API
            </button>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="mb-6">
            <Alert className={`${
              notification.type === "success" 
                ? "bg-green-500/10 border-green-500/30 text-green-400" 
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Content */}
        {apis.length === 0 ? (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-12">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-slate-700 blur-2xl opacity-50 rounded-full"></div>
                <div className="relative bg-slate-800 p-6 rounded-full border border-slate-700/50">
                  <Inbox className="w-16 h-16 text-slate-500" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">No Mock APIs Yet</h2>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                Get started by creating your first mock API endpoint to simulate various failure scenarios and chaos conditions.
              </p>
              <button
                onClick={() => navigate("/create")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all shadow-lg shadow-purple-500/25"
              >
                <Plus className="w-5 h-5" />
                Create Your First API
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {apis.map(apiItem => (
              <MockApiCard
                key={apiItem._id}
                api={apiItem}
                onCopy={handleCopy}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}