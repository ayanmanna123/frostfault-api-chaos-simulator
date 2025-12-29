import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MockApis from "./pages/MockApis";
import CreateMockApi from "./pages/CreateMockApi";
import Logs from "./pages/Logs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mock-apis" element={<MockApis />} />
        <Route path="/create" element={<CreateMockApi />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
