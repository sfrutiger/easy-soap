const { DateTime } = require("luxon");

const Note = ({ selectedNote, selectedPatient }) => {
  const notes = selectedPatient.notes;
  const openNote = notes.find((x) => x._id === selectedNote);
  let formattedDate;

  if (selectedNote) {
    const noteDate = new Date(openNote.date);
    const offset = noteDate.getTimezoneOffset();
    formattedDate = DateTime.fromJSDate(noteDate)
      .plus({
        minutes: offset,
      })
      .toLocaleString(DateTime.DATE_SHORT);
  }

  return (
    <div className="w-full col-span-3">
      {selectedNote !== "" ? (
        <div className="w-full flex justify-center">
          <div className="border-2 py-4 px-6 w-full">
            <div className="my-2">
              <h5 className="section-label">Encounter date</h5>
              <p>{formattedDate}</p>
            </div>
            <div className="my-2">
              <h5 className="section-label">Subjective</h5>
              <p>{openNote.subjective}</p>
            </div>
            <div className="my-2">
              <h5 className="section-label">Objective</h5>
              <p>{openNote.objective}</p>
            </div>
            <div className="my-2">
              <h5 className="section-label">Assessment</h5>
              <p>{openNote.assessment}</p>
            </div>
            <div className="my-2">
              <h5 className="section-label">Plan</h5>
              <p>{openNote.plan}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Note;
