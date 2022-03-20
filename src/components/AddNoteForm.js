import { useState } from "react";

const AddNoteForm = ({
  toggleAddNoteForm,
  saveNewNote,
  activePatient,
  patients,
}) => {
  const selectedPatient = patients.find(
    (patient) => patient.id === activePatient
  );

  const [date, setDate] = useState("");
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [assessment, setAssessment] = useState("");
  const [plan, setPlan] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      alert("Add date of encounter");
      return;
    }
    saveNewNote({ date, subjective, objective, assessment, plan });
    setDate("");
    setSubjective("");
    setObjective("");
    setAssessment("");
    setPlan("");
    toggleAddNoteForm();
  };

  return (
    <div>
      <h3>
        {selectedPatient.lastName}, {selectedPatient.firstName}
      </h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="date">Encounter date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="subjective">Subjective</label>
          <input
            type="text"
            name="subjective"
            value={subjective}
            onChange={(e) => setSubjective(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="objective">Objective</label>
          <input
            type="text"
            name="objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="assessment">Assessment</label>
          <input
            type="text"
            name="assessment"
            value={assessment}
            onChange={(e) => setAssessment(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="plan">Plan</label>
          <input
            type="text"
            name="plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          ></input>
        </div>
        <div>
          <input type="submit" value="Finalize note"></input>
          <button onClick={() => toggleAddNoteForm()}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteForm;
