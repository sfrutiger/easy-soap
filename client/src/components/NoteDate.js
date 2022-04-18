const { DateTime } = require("luxon");

const NoteDate = ({ id, noteDate, selectNote }) => {
  // Format dates for notes
  const date = new Date(noteDate);
  const offset = date.getTimezoneOffset();
  let formattedDate = DateTime.fromJSDate(date)
    .plus({
      minutes: offset,
    })
    .toLocaleString(DateTime.DATE_SHORT);

  return (
    <p className="records" onClick={() => selectNote(id)}>
      {formattedDate}
    </p>
  );
};

export default NoteDate;
