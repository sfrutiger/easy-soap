const Patient = ({ patient, onSelect }) => {
    return (
        <div onClick={() => onSelect(patient.id)}>
            <h4>{patient.lastName}, {patient.firstName}</h4>
            <p>Date of Birth {patient.birthDate}</p>
        </div>
    )
}

export default Patient
