const Patient = ({ patient, selectPatient }) => {
  return (
    <div onClick={() => selectPatient(patient._id)}>
      <h4 className="records">
        {patient.lastName}, {patient.firstName} {patient.birthDate}
      </h4>
    </div>
  );
};

export default Patient;
