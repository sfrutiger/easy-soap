import { useState } from "react";

const AddPatientForm = ({ toggleAddPatientForm, saveNewPatient }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const notes = [];

  const onSubmit = (e) => {
    e.preventDefault();

    if (!firstName) {
      alert("Add first name");
      return;
    }
    if (!lastName) {
      alert("Add last name");
      return;
    }
    if (!birthDate) {
      alert("Add date of birth");
      return;
    }
    saveNewPatient({ firstName, lastName, birthDate, notes });
    setFirstName("");
    setLastName("");
    setBirthDate("");
    toggleAddPatientForm();
  };

  return (
    <div>
      <h3>Add new patient</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            name="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            name="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="birthdate">Date of birth</label>
          <input
            type="date"
            name="birthdate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          ></input>
        </div>
        <div>
          <input type="submit" value="Save"></input>
          <button onClick={() => toggleAddPatientForm()}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
