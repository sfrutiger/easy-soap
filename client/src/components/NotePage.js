import { useState } from "react";
import Note from "./Note";
import NoteList from "./NoteList";

const NotePage = ({
  patients,
  activePatient,
  closePatient,
  toggleAddNoteForm,
  addNote,
}) => {
  const [selectedNote, setSelectedNote] = useState("");

  const selectNote = (id) => {
    setSelectedNote(id);
    console.log(selectedPatient, selectedNote);
  };

  const closeNote = () => {
    setSelectedNote("");
  };

  const selectedPatient = patients.find(
    (patient) => patient._id === activePatient
  );

  // Sort notes by date
  const patientNotes = selectedPatient.notes || [];
  patientNotes.sort((a, b) => (a.date < b.date ? 1 : -1));

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

        <div className="mb-4 text-center">
          <h3 className="text-3xl">
            {selectedPatient.lastName}, {selectedPatient.firstName}
          </h3>
        </div>
        <div className="grid grid-cols-5">
          <NoteList
            patients={patients}
            activePatient={activePatient}
            closePatient={closePatient}
            toggleAddNoteForm={toggleAddNoteForm}
            addNote={addNote}
            selectedPatient={selectedPatient}
            selectNote={selectNote}
          />
          <Note selectedNote={selectedNote} selectedPatient={selectedPatient} />
        </div>
      </div>
    </div>
  );
};

export default NotePage;
