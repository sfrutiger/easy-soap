import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Header from "./components/Header";
import PatientList from "./components/PatientList";
import NotePage from "./components/NotePage";
import AddPatientForm from "./components/routes/AddPatientForm";
import AddNoteForm from "./components/routes/AddNoteForm";
import Login from "./components/Login";
import CreateAccount from "./components/routes/CreateAccount";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  // Patient state
  const [patients, setPatients] = useState([]);

  const getPatients = async () => {
    try {
      const response = await axios.get("/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //
  // Selection of patients
  const [activePatient, setActivePatient] = useState("");

  // Select active patient
  const selectPatient = (_id) => {
    setActivePatient(_id);
  };

  // Close active patient
  const closePatient = () => {
    setActivePatient("");
  };

  //
  // Adding and deleting patients
  const [addPatient, setAddPatient] = useState(false);

  // Open add patient form
  const toggleAddPatientForm = () => {
    setAddPatient(!addPatient);
  };

  // Delete patient
  const deletePatient = (id) => {
    axios.delete(`/api/patients/${id}`);
    setPatients(patients.filter((patient) => patient._id !== id));
  };

  //
  // Adding notes
  const [addNote, setAddNote] = useState(false);

  // Open add note form
  const toggleAddNoteForm = () => {
    setAddNote(!addNote);
  };

  // Save new note
  const saveNewNote = async (note) => {
    const newNote = {
      date: note.date,
      subjective: note.subjective,
      objective: note.objective,
      assessment: note.assessment,
      plan: note.plan,
    };
    const updatedNotes = [...note.selectedPatient.notes, newNote];
    await axios.patch(`/api/patients/${activePatient}`, {
      notes: updatedNotes,
    });
    getPatients();
  };

  // Logut user
  const logout = async () => {
    axios
      .delete("api/auth")
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
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
                <PatientList patients={patients} />
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
          <Route exact path="/create-account" element={<CreateAccount />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
