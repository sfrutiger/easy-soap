const Patient = ({ patient, selectPatient, deletePatient }) => {
  const birthDate = patient.birthDate;
  const formattedBirthDate = new Date(birthDate).toLocaleDateString("en-US");

  return (
    <div>
      <h4 className="records" onClick={() => selectPatient(patient._id)}>
        {patient.lastName}, {patient.firstName} {formattedBirthDate}
      </h4>
      {/* <button onClick={() => deletePatient(patient._id)}>Delete Patient</button> */}
    </div>
  );
};

export default Patient;
