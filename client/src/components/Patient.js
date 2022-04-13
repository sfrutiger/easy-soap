const { DateTime } = require("luxon");

const Patient = ({ patient, selectPatient, deletePatient }) => {
  return (
    <div>
      <h4 className="records" onClick={() => selectPatient(patient._id)}>
        {patient.lastName}, {patient.firstName} {patient.birthDate}
      </h4>
      {/* <button onClick={() => deletePatient(patient._id)}>Delete Patient</button> */}
    </div>
  );
};

export default Patient;
