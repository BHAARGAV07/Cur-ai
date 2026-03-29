import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { PatientIntake } from "./components/PatientIntake";
import { NotesViewer } from "./components/NotesViewer";
import { CodeSuggestions } from "./components/CodeSuggestions";
import { CodeEditor } from "./components/CodeEditor";
import { InsurancePanel } from "./components/InsurancePanel";
import { AuditTrail } from "./components/AuditTrail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "patient/:patientId", Component: PatientIntake },
      { path: "notes/:patientId", Component: NotesViewer },
      { path: "codes/:patientId", Component: CodeSuggestions },
      { path: "edit/:patientId", Component: CodeEditor },
      { path: "insurance/:patientId", Component: InsurancePanel },
      { path: "audit/:patientId", Component: AuditTrail },
    ],
  },
]);
