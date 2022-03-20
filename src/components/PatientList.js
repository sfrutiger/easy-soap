import Patient from "./Patient";

const PatientList = ({ patients, selectPatient, toggleAddPatientForm }) => {
  return (
    <div>
      <h3>Patients</h3>
      <button onClick={() => toggleAddPatientForm()}>Add new patient</button>
      {patients.map((patient) => (
        <Patient
          key={patient.id}
          patient={patient}
          selectPatient={selectPatient}
        />
      ))}
    </div>
  );
};

export default PatientList;
