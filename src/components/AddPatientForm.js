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
    <div className="w-full flex justify-center mt-16">
      <div className="border-2 p-2">
        <h3 className="text-2xl border-b-2 inline">Add new patient</h3>
        <form className="my-4" onSubmit={onSubmit}>
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
            <input
              className="submit-button"
              type="submit"
              value="Save patient"
            ></input>
            <button onClick={() => toggleAddPatientForm()}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
