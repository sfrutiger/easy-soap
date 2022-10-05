import { Link } from "react-router-dom";
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
      <Link
        to={`/patientdetail/${patient._id}`}
        state={patient}
        key={patient._id}
      >
        <h4 className="records">
          {patient.lastName}, {patient.firstName} {formattedDate}
        </h4>
      </Link>
      {/* <button onClick={() => deletePatient(patient._id)}>Delete Patient</button> */}
    </div>
  );
};

export default Patient;
