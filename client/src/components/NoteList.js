import NoteDate from "./NoteDate";

const NoteList = ({ patient, selectNote }) => {
  // Sort notes by date
  const patientNotes = patient.notes || [];
  patientNotes.sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="col-span-1">
      <div className="w-full">
        <div>
          <h4 className="text-2xl">Notes:</h4>
          {patientNotes.length === 0 ? <h4>No notes to show</h4> : ""}
          {patientNotes.map((note) => (
            <NoteDate
              key={note._id}
              id={note._id}
              noteDate={note.date}
              selectNote={selectNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
