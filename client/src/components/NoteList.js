import { useState } from "react";
import Note from "./Note";

const NoteList = ({
  patients,
  activePatient,
  closePatient,
  toggleAddNoteForm,
}) => {
  const [selectedNote, setSelectedNote] = useState("");

  const selectNote = (id) => {
    setSelectedNote(id);
  };

  const closeNote = () => {
    setSelectedNote("");
  };

  const selectedPatient = patients.find(
    (patient) => patient._id === activePatient
  );

  const patientNotes = selectedPatient.notes || [];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between">
          <button onClick={closePatient}>Return to patient list</button>
          <button onClick={() => toggleAddNoteForm()}>Add note</button>
        </div>
        {selectedNote !== "" ? (
          <button onClick={() => closeNote()}>Return to note list</button>
        ) : (
          ""
        )}

        <div className="my-2">
          <h3 className="text-2xl border-b-2 inline">
            {selectedPatient.lastName}, {selectedPatient.firstName}
          </h3>
          <h3 className="text-xl my-2">Notes:</h3>
        </div>

        {patientNotes.length === 0 ? <h4>No notes to show</h4> : ""}
        {patientNotes.map((note) => (
          <Note
            key={note._id}
            note={note}
            selectNote={selectNote}
            selectedNote={selectedNote}
            closeNote={closeNote}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
