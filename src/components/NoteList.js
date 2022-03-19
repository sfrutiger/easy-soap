import Note from "./Note"

const NoteList = ({ patients, activePatient, closePatient }) => {

    const selectedPatient = patients.find(patient => patient.id === activePatient);
    const patientNotes = selectedPatient.notes;

    return (
        <div>
            <button onClick = {closePatient}>Close</button>
            <h3>{selectedPatient.lastName}, {selectedPatient.firstName}</h3>
            <h4>Notes</h4>
            {patientNotes.map((note) => (
            <Note key={note.id} note={note}/>
            ))}
        </div>
    )
}

export default NoteList
