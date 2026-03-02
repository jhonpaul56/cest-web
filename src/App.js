import { BrowserRouter, Routes, Route } from "react-router-dom";
import CESTLogin     from "./pages/CESTLogin";
import CESTSignup    from "./pages/CESTSignup";
import CESTDashboard from "./pages/CESTDashboard";
import CESTDataEntry from "./pages/CESTDataEntry";
import CESTDocuments from "./pages/CESTDocuments";
import CESTProjects  from "./pages/CESTProjects";
import CESTReports   from "./pages/CESTReports";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<CESTLogin />} />
        <Route path="/signup"     element={<CESTSignup />} />
        <Route path="/dashboard"  element={<CESTDashboard />} />
        <Route path="/data-entry" element={<CESTDataEntry />} />
        <Route path="/documents"  element={<CESTDocuments />} />
        <Route path="/projects"   element={<CESTProjects />} />
        <Route path="/reports"    element={<CESTReports />} />
      </Routes>
    </BrowserRouter>
  );
}