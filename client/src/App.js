import { useState, useEffect } from "react";
import axios from "axios";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import LogoutButton from "./components/LogoutButton";
import PatientList from "./components/PatientList";
import NotePage from "./components/NotePage";
import AddPatientForm from "./components/AddPatientForm";
import AddNoteForm from "./components/AddNoteForm";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
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

  // Save new patient information
  const saveNewPatient = async (patient) => {
    const response = await axios.post("/api/patients", {
      lastName: patient.lastName,
      firstName: patient.firstName,
      birthDate: patient.birthDate,
    });
    setPatients((patients) => [...patients, response.data]);
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
        <LogoutButton logout={logout} />
        {activePatient !== "" || addPatient === true ? (
          ""
        ) : (
          <PatientList
            patients={patients}
            selectPatient={selectPatient}
            deletePatient={deletePatient}
            toggleAddPatientForm={toggleAddPatientForm}
            addPatient={addPatient}
          />
        )}
        {activePatient === "" || addNote === true ? (
          ""
        ) : (
          <NotePage
            patients={patients}
            activePatient={activePatient}
            closePatient={closePatient}
            toggleAddNoteForm={toggleAddNoteForm}
            addNote={addNote}
          />
        )}
        {addNote === true ? (
          <AddNoteForm
            patients={patients}
            activePatient={activePatient}
            toggleAddNoteForm={toggleAddNoteForm}
            saveNewNote={saveNewNote}
          />
        ) : (
          ""
        )}
        {addPatient ? (
          <AddPatientForm
            toggleAddPatientForm={toggleAddPatientForm}
            saveNewPatient={saveNewPatient}
          />
        ) : (
          ""
        )}
        <Routes>
          <Route exact path="/" element={<Login getPatients={getPatients} />} />
          <Route exact path="/create-account" element={<CreateAccount />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
