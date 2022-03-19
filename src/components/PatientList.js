import Patient from "./Patient"

const PatientList = ({ patients, onSelect }) => {   
    return (
        <div>
            <h3>Patient List</h3>
            {patients.map((patient) => (
            <Patient key={patient.id} patient={patient} onSelect={onSelect}/>
            ))}
        </div>
    )
}

export default PatientList
