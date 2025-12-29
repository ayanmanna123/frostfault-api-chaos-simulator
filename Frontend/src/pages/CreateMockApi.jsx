import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { Plus, Zap, Clock, ShieldAlert, Activity, ArrowLeft, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CreateMockApi() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    endpoint: "",
    method: "GET",
    successResponse: "{}",
    errorProbability: 0,
    latencyMin: 0,
    latencyMax: 0,
    rateLimit: 0,
    windowMs: 10000
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/mock/create", {
        name: form.name,
        endpoint: form.endpoint,
        method: form.method,
        successResponse: JSON.parse(form.successResponse),
        chaosConfig: {
          errorProbability: Number(form.errorProbability),
          latency: {
            min: Number(form.latencyMin),
            max: Number(form.latencyMax)
          },
          malformedResponse: false
        },
        rateLimit: {
          limit: Number(form.rateLimit),
          windowMs: Number(form.windowMs)
        }
      });

      navigate("/mock-apis");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create mock API");
    } finally {
      setLoading(false);
    }
  };

  const methodColors = {
    GET: "bg-green-500/10 text-green-400 border-green-500/30",
    POST: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    PUT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    DELETE: "bg-red-500/10 text-red-400 border-red-500/30"
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/mock-apis")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Mock APIs</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50"></div>
              <div className="relative bg-linear-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                <Plus className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Create Mock API
              </h1>
              <p className="text-slate-400 mt-1">Configure your chaos engineering endpoint</p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-500/10 border-red-500/30 text-red-400">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Configuration */}
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Basic Configuration</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-slate-300 mb-2 block">API Name</Label>
                <Input
                  name="name"
                  placeholder="e.g., User Service API"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <Label className="text-slate-300 mb-2 block">Endpoint Path</Label>
                <Input
                  name="endpoint"
                  placeholder="/api/users"
                  value={form.endpoint}
                  onChange={handleChange}
                  required
                  className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20 font-mono"
                />
              </div>

              <div>
                <Label className="text-slate-300 mb-2 block">HTTP Method</Label>
                <div className="flex gap-2">
                  {["GET", "POST", "PUT", "DELETE"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setForm({ ...form, method })}
                      className={`px-4 py-2 rounded-lg border font-semibold text-sm transition-all ${
                        form.method === method
                          ? methodColors[method]
                          : "bg-slate-900/50 border-slate-700/30 text-slate-400 hover:border-slate-600/50"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-300 mb-2 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Success Response (JSON)
                </Label>
                <textarea
                  name="successResponse"
                  placeholder='{"message": "Success", "data": []}'
                  value={form.successResponse}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Chaos Configuration */}
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">Chaos Configuration</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-slate-300 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    Error Probability
                  </span>
                  <span className="text-sm font-mono text-purple-400">
                    {(form.errorProbability * 100).toFixed(0)}%
                  </span>
                </Label>
                <input
                  type="range"
                  name="errorProbability"
                  min="0"
                  max="1"
                  step="0.1"
                  value={form.errorProbability}
                  onChange={handleChange}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <Label className="text-slate-300 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Latency Range (ms)
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="number"
                      name="latencyMin"
                      placeholder="Min"
                      value={form.latencyMin}
                      onChange={handleChange}
                      className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      name="latencyMax"
                      placeholder="Max"
                      value={form.latencyMax}
                      onChange={handleChange}
                      className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Limiting */}
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Rate Limiting</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300 mb-2 block">Request Limit</Label>
                <Input
                  type="number"
                  name="rateLimit"
                  placeholder="100"
                  value={form.rateLimit}
                  onChange={handleChange}
                  className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                />
              </div>
              <div>
                <Label className="text-slate-300 mb-2 block">Window (ms)</Label>
                <Input
                  type="number"
                  name="windowMs"
                  placeholder="60000"
                  value={form.windowMs}
                  onChange={handleChange}
                  className="bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/mock-apis")}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700/50 rounded-lg text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Mock API
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}