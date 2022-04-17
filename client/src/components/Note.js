const { DateTime } = require("luxon");

const Note = ({ note, selectNote, selectedNote }) => {
  const date = new Date(note.date);
  const offset = date.getTimezoneOffset();
  let formattedDate = DateTime.fromJSDate(date)
    .plus({
      minutes: offset,
    })
    .toLocaleString(DateTime.DATE_SHORT);

  return (
    <div>
      <div>
        {selectedNote === "" ? (
          <p className="records" onClick={() => selectNote(note._id)}>
            {formattedDate}
          </p>
        ) : (
          ""
        )}
        {selectedNote === note._id ? (
          <div className="w-full flex justify-center mt-4">
            <div className="border-2 p-2 w-[50%] items-center">
              <div className="my-2">
                <h5 className="section-label">Encounter date</h5>
                <p>{formattedDate}</p>
              </div>
              <div className="my-2">
                <h5 className="section-label">Subjective</h5>
                <p>{note.subjective}</p>
              </div>
              <div className="my-2">
                <h5 className="section-label">Objective</h5>
                <p>{note.objective}</p>
              </div>
              <div className="my-2">
                <h5 className="section-label">Assessment</h5>
                <p>{note.assessment}</p>
              </div>
              <div className="my-2">
                <h5 className="section-label">Plan</h5>
                <p>{note.plan}</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Note;
