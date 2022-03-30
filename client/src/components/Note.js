const Note = ({ note, selectNote, selectedNote, closeNote }) => {
  return (
    <div>
      <div>
        {selectedNote === "" ? (
          <h4 className="records" onClick={() => selectNote(note._id)}>
            {note.date}
          </h4>
        ) : (
          ""
        )}
        {selectedNote === note._id ? (
          <div className="w-full flex justify-center mt-4">
            <div className="border-2 p-2">
              <div className="my-2">
                <h5 className="section-label">Encounter date</h5>
                <p>{note.date}</p>
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
