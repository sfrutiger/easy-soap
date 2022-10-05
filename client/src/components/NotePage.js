import { useState } from "react";
import Note from "./Note";
import NoteList from "./NoteList";
import { Link, useNavigate } from "react-router-dom";

const NotePage = ({
  patient,
  patients,
  closePatient,
  toggleAddNoteForm,
  addNote,
}) => {
  const navigate = useNavigate();
  const [selectedNote, setSelectedNote] = useState("");

  const selectNote = (id) => {
    setSelectedNote(id);
  };

  const closeNote = () => {
    setSelectedNote("");
  };

  // Sort notes by date
  const patientNotes = patient.notes || [];
  patientNotes.sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between">
          <button onClick={() => navigate("/signed-in")}>
            Return to patient list
          </button>
          <Link to={`/add-note`} state={patient}>
            <button>Add note</button>
          </Link>
        </div>
        {selectedNote !== "" ? (
          <button onClick={() => closeNote()}>Return to note list</button>
        ) : (
          ""
        )}

        <div className="mb-4 text-center">
          <h3 className="text-3xl">
            {patient.lastName}, {patient.firstName}
          </h3>
        </div>
        <div className="grid grid-cols-5">
          <NoteList
            patients={patients}
            patient={patient}
            closePatient={closePatient}
            toggleAddNoteForm={toggleAddNoteForm}
            addNote={addNote}
            selectNote={selectNote}
          />
          <Note selectedNote={selectedNote} patient={patient} />
        </div>
      </div>
    </div>
  );
};

export default NotePage;
