import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import PatientList from "./components/PatientList";
import NoteList from "./components/NoteList";
import AddPatientForm from "./components/AddPatientForm";
import AddNoteForm from "./components/AddNoteForm";

function App() {
  const [patients, setPatients] = useState([]);

  //get patients from server
  const getPatients = async () => {
    const response = await axios.get("/api/patients");
    setPatients(response.data);
  };

  useEffect(() => {
    getPatients(patients);
  }, [patients]);

  //selection of patients
  const [activePatient, setActivePatient] = useState("");

  //select active patient
  const selectPatient = (_id) => {
    setActivePatient(_id);
  };

  //close active patient
  const closePatient = () => {
    setActivePatient("");
  };

  //adding patients
  const [addPatient, setAddPatient] = useState(false);

  //open add patient form
  const toggleAddPatientForm = () => {
    setAddPatient(!addPatient);
  };

  //save new patient information
  const saveNewPatient = (patient) => {
    axios.post("/api/patients", {
      lastName: patient.lastName,
      firstName: patient.firstName,
      birthDate: patient.birthDate,
    });
  };

  //adding notes
  const [addNote, setAddNote] = useState(false);

  //open add patient form
  const toggleAddNoteForm = () => {
    setAddNote(!addNote);
  };

  return (
    <div className="App">
      <Header />
      {activePatient !== "" || addPatient === true ? (
        ""
      ) : (
        <PatientList
          patients={patients}
          selectPatient={selectPatient}
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
