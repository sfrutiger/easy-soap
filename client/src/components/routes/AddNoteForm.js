import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";

const AddNoteForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(location.state);

  const [date, setDate] = useState("");
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [assessment, setAssessment] = useState("");
  const [plan, setPlan] = useState("");

  const [error, setError] = useState("");
  //reset error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const saveNewNote = () => {
    const newNote = {
      _id: "temporary",
      date: date,
      subjective: subjective,
      objective: objective,
      assessment: assessment,
      plan: plan,
    };
    const updatedNotes = [...patient.notes, newNote];
    setPatient((patient.notes = updatedNotes));
    auth.currentUser.getIdToken(true).then(async function (idToken) {
      const response = await axios.patch(
        `/api/patients/${patient._id}`,
        {
          notes: updatedNotes,
        },
        {
          headers: {
            authtoken: idToken,
          },
        }
      );
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      setError("Add date of encounter");
    } else if (!subjective) {
      setError("Add subjective");
    } else if (!objective) {
      setError("Add objective");
    } else if (!assessment) {
      setError("Add assessment");
    } else if (!plan) {
      setError("Add plan");
    } else {
      saveNewNote();
      navigate(`/patientdetail/${patient._id}`, { state: patient });
    }
  };

  return (
    <div className="form-container">
      <div className="form-border">
        <h3 className="form-label">
          {patient.lastName}, {patient.firstName}
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
          <div className="w-[100%]">
            <button
              className="submit-button"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <input
              className="submit-button ml-2"
              type="submit"
              value="Finalize note"
            ></input>
          </div>
          <div className="error-message">{error}</div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteForm;
