const Note = ({ note, selectNote, selectedNote, closeNote }) => {
    return (
        <div>
            {selectedNote === note.id || selectedNote === '' ? <h4 onClick={() => selectNote(note.id)}>{note.date}</h4> : ''}
            {selectedNote === note.id ? <button onClick={() => closeNote()}>Close</button> : ''}
            {selectedNote === note.id ?
            <div>
                <div>
                    <h5>Subjective</h5>
                    <p>{note.subjective}</p>
                </div>
                <div>
                    <h5>Objective</h5>
                    <p>{note.objective}</p>
                </div>
                <div>
                    <h5>Assessment</h5>
                    <p>{note.assessment}</p>
                </div>
                <div>
                    <h5>Plan</h5>
                    <p>{note.plan}</p>
                </div>
            </div> : ''}
        </div>
    )
}

export default Note
