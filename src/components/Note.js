import { useState } from 'react'

const Note = ({ note }) => {

    const [openNote, setOpenNote] = useState(false);

    const toggleNote = () => {
        setOpenNote(!openNote)
    }

    return (
        <div>
            <h4 onClick={() => toggleNote()}>{note.date}</h4>
            {openNote === false ? '' :
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
            </div>}
        </div>
    )
}

export default Note
