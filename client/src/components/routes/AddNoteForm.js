import { useState } from "react";

const AddNoteForm = ({
  toggleAddNoteForm,
  saveNewNote,
  activePatient,
  patients,
}) => {
  const selectedPatient = patients.find(
    (patient) => patient._id === activePatient
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
    saveNewNote({
      selectedPatient,
      date,
      subjective,
      objective,
      assessment,
      plan,
    });
    setDate("");
    setSubjective("");
    setObjective("");
    setAssessment("");
    setPlan("");
    toggleAddNoteForm();
  };

  return (
    <div className="form-container">
      <div className="form-border">
        <h3 className="form-label">
          {selectedPatient.lastName}, {selectedPatient.firstName}
        </h3>
        <form className="my-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="date">Encounter date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="subjective">Subjective</label>
            <textarea
              type="text"
              name="subjective"
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="objective">Objective</label>
            <textarea
              type="text"
              name="objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="assessment">Assessment</label>
            <textarea
              type="text"
              name="assessment"
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="plan">Plan</label>
            <textarea
              type="text"
              name="plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            ></textarea>
          </div>
          <div>
            <input
              className="submit-button"
              type="submit"
              value="Finalize note"
            ></input>
            <button onClick={() => toggleAddNoteForm()}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteForm;
