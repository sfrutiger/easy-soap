import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Header from "./components/Header";
import PatientList from "./components/PatientList";
import PatientDetail from "./components/routes/PatientDetail";
import AddPatientForm from "./components/routes/AddPatientForm";
import AddNoteForm from "./components/routes/AddNoteForm";
import Login from "./components/Login";
import CreateAccount from "./components/routes/CreateAccount";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  // Patient state
  const [patients, setPatients] = useState([]);

  // Delete patient
  const deletePatient = (id) => {
    axios.delete(`/api/patients/${id}`);
    setPatients(patients.filter((patient) => patient._id !== id));
  };

  return (
    <AuthContextProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/signed-in"
            element={
              <ProtectedRoute>
                <PatientList patients={patients} setPatients={setPatients} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/add-patient"
            element={
              <ProtectedRoute>
                <AddPatientForm />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/add-note"
            element={
              <ProtectedRoute>
                <AddNoteForm />
              </ProtectedRoute>
            }
          />
          <Route exact path="/create-account" element={<CreateAccount />} />
          <Route
            exact
            path="patientdetail/:id"
            element={
              <ProtectedRoute>
                <PatientDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
