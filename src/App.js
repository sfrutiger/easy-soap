import { useState } from "react";
import Header from "./components/Header";
import PatientList from "./components/PatientList";
import NoteList from "./components/NoteList";
import AddPatientForm from "./components/AddPatientForm";

function App() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      firstName: "Joe",
      lastName: "Everyman",
      birthDate: "1965-01-23",
      notes: [
        {
          id: 1,
          date: "2022-03-01",
          subjective: "Patient complains of some bullshit.",
          objective: "Lumbar ROM WNL and pain free.",
          assessment: "Acute low back pain.",
          plan: "Immediate hemicorporectomy.",
        },
        {
          id: 2,
          date: "2022-03-16",
          subjective: "Patient 2 days post hemicorporectomy.",
          objective:
            'Pain of "20/10", surgical wound with no signs of infection.',
          assessment: "Routine healing.",
          plan: "Return for checkup in 3 days.",
        },
      ],
    },
    {
      id: 2,
      firstName: "Wanda",
      lastName: "Whinygirl",
      birthDate: "1936-07-02",
      notes: [
        {
          id: 1,
          date: "2022-03-02",
          subjective: "Patient reports pain in foot after kicking a rat.",
          objective: "Pain of 6/10. Normal R foot, no signs of acute injury.",
          assessment: "Acute foot pain.",
          plan: "Monitor and return if pain persists.",
        },
        {
          id: 2,
          date: "2022-03-03",
          subjective: "Patient returns complaing of increased pain.",
          objective: "L foot pain of 10/10.",
          assessment: "Pain has migrated contralaterally.",
          plan: "Have 3-7 cold beers and think about what lead me to this point in my life.",
        },
      ],
    },
  ]);

  //selection of patients
  const [activePatient, setActivePatient] = useState("");

  //select active patient
  const selectPatient = (id) => {
    setActivePatient(id);
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
    const id = Math.floor(Math.random() * 10000) + 1;
    const newPatient = { id, ...patient };
    setPatients([...patients, newPatient]);
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
      {activePatient === "" ? (
        ""
      ) : (
        <NoteList
          patients={patients}
          activePatient={activePatient}
          closePatient={closePatient}
        />
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
