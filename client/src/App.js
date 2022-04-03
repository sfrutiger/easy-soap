import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import PatientList from "./components/PatientList";
import NoteList from "./components/NoteList";
import AddPatientForm from "./components/AddPatientForm";
import AddNoteForm from "./components/AddNoteForm";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";

function App() {
  // Token authentication
  const [token, setToken] = useState("");

  // Patient state
  const [patients, setPatients] = useState([]);

  // Get patients from server
  const getPatients = async () => {
    const response = await axios.get("/api/patients");
    setPatients(response.data);
  };

  useEffect(() => {
    getPatients(patients);
  }, [patients]);

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
  const saveNewPatient = (patient) => {
    axios.post(
      "/api/patients",
      {
        lastName: patient.lastName,
        firstName: patient.firstName,
        birthDate: patient.birthDate,
        token: token,
      },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
  };

  // Delete patient
  const deletePatient = (id) => {
    axios.delete(`/api/patients/${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });
  };

  //
  // Adding notes
  const [addNote, setAddNote] = useState(false);

  // Open add note form
  const toggleAddNoteForm = () => {
    setAddNote(!addNote);
  };

  // Save new note
  const saveNewNote = (note) => {
    const newNote = {
      date: note.date,
      subjective: note.subjective,
      objective: note.objective,
      assessment: note.assessment,
      plan: note.plan,
    };
    const updatedNotes = [...note.selectedPatient.notes, newNote];
    axios.patch(
      `/api/patients/${activePatient}`,
      {
        notes: updatedNotes,
      },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    console.log(updatedNotes);
  };

  if (!token) {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route
              path="/create-account"
              element={<CreateAccount setToken={setToken} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
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
        <NoteList
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
    </div>
  );
}

export default App;
