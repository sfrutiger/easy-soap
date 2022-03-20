import { useState } from "react";
import Note from "./Note";

const NoteList = ({ patients, activePatient, closePatient }) => {
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
      <button onClick={closePatient}>Close</button>
      <h3>
        {selectedPatient.lastName}, {selectedPatient.firstName}
      </h3>
      {selectedNote === "" ? <h4>Notes</h4> : ""}
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
