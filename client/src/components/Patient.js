const { DateTime } = require("luxon");

const Patient = ({ patient, selectPatient, deletePatient }) => {
  const date = new Date(patient.birthDate);
  const offset = date.getTimezoneOffset();
  let formattedDate = DateTime.fromJSDate(date)
    .plus({
      minutes: offset,
    })
    .toLocaleString(DateTime.DATE_SHORT);

  return (
    <div>
      <h4 className="records" onClick={() => selectPatient(patient._id)}>
        {patient.lastName}, {patient.firstName} {formattedDate}
      </h4>
      {/* <button onClick={() => deletePatient(patient._id)}>Delete Patient</button> */}
    </div>
  );
};

export default Patient;
