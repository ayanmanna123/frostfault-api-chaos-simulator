import { useEffect, useState } from "react";
import api from "../api/api";
import MockApiCard from "../components/MockApiCard";

export default function MockApis() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApis = async () => {
      try {
        const res = await api.get("/api/mock");
        setApis(res.data);
      } catch (err) {
        console.error("Failed to load mock APIs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApis();
  }, []);

  if (loading) {
    return <div className="p-6">Loading mock APIs...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mock APIs</h1>

      {apis.length === 0 ? (
        <p>No mock APIs created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apis.map(api => (
            <MockApiCard key={api._id} api={api} />
          ))}
        </div>
      )}
    </div>
  );
}
