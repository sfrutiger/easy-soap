import Patient from "./Patient";

const PatientList = ({
  patients,
  selectPatient,
  deletePatient,
  toggleAddPatientForm,
}) => {

  /* const patientsSorted = patients || []; */
  patients.sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between mb-2">
          <h3 className="text-2xl border-b-2">Patients</h3>
          <button onClick={() => toggleAddPatientForm()}>
            Add new patient
          </button>
        </div>
        {patients.map((patient) => (
          <Patient
            key={patient._id}
            patient={patient}
            selectPatient={selectPatient}
            deletePatient={deletePatient}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientList;
