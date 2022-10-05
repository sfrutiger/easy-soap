import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";

const AddPatientForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const notes = [];

  //reset error
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);

  // Save new patient information
  const saveNewPatient = () => {
    auth.currentUser.getIdToken(true).then(async function (idToken) {
      const response = await axios.post(
        "/api/patients",
        {
          lastName: lastName,
          firstName: firstName,
          birthDate: birthDate,
        },
        {
          headers: {
            authtoken: idToken,
          },
        }
      );
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!firstName) {
      setErrorMessage("Add first name");
      return;
    }
    if (!lastName) {
      setErrorMessage("Add last name");
      return;
    }
    if (!birthDate) {
      setErrorMessage("Add date of birth");
      return;
    } else {
      saveNewPatient();
      navigate("/signed-in");
    }
  };

  return (
    <div className="form-container">
      <div className="form-border">
        <h3 className="form-label">Add new patient</h3>
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
            <button onClick={() => navigate("/signed-in")}>Cancel</button>
            <input
              className="submit-button m-0 ml-2"
              type="submit"
              value="Save patient"
            ></input>
          </div>
        </form>
        <div className="error-message">{errorMessage}</div>
      </div>
    </div>
  );
};

export default AddPatientForm;
