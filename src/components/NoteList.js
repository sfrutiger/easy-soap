import { useState } from "react";
import Note from "./Note";

const NoteList = ({
  patients,
  activePatient,
  closePatient,
  toggleAddNoteForm,
  addNote,
}) => {
  const [selectedNote, setSelectedNote] = useState("");

  const selectNote = (id) => {
    setSelectedNote(id);
  };

  const closeNote = () => {
    setSelectedNote("");
  };

  const selectedPatient = patients.find(
    (patient) => patient.id === activePatient
  );
  const patientNotes = selectedPatient.notes;

  return (
    <div>
      <button onClick={closePatient}>Return to patient list</button>
      <h3>
        {selectedPatient.lastName}, {selectedPatient.firstName}
      </h3>
      <button onClick={() => toggleAddNoteForm()}>Add note</button>
      {selectedNote !== "" || patientNotes.length === 0 ? "" : <h4>Notes</h4>}
      {patientNotes.length === 0 ? <h4>No notes to show</h4> : ""}
      {patientNotes.map((note) => (
        <Note
          key={note.id}
          note={note}
          selectNote={selectNote}
          selectedNote={selectedNote}
          closeNote={closeNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
