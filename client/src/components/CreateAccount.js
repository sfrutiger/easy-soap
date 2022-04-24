import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

  // Create new user
  const createUser = async (res) => {
    try {
      const response = await axios.post("api/users", {
        name: name,
        email: email,
        password: password,
      });
      setAccountCreated(true);
      setMessage("Account succesfully created!");
    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setErrorMessage("Enter a name!");
      setTimeout(() => setErrorMessage(""), 5000);
    } else if (!email) {
      setErrorMessage("Enter an email!");
      setTimeout(() => setErrorMessage(""), 5000);
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setTimeout(() => setErrorMessage(""), 5000);
    } else {
      createUser({ name, email, password });
    }
  };

  return (
    <div className="w-full flex justify-center mt-8">
      {accountCreated ? (
        <div className="border-2 p-2 h-[200px] mt-10 flex flex-col items-center justify-around">
          <h1 className="text-2xl">{message}</h1>
          <button>
            <Link to="/">Go to login</Link>
          </button>
        </div>
      ) : (
        <div className="border-2 p-2">
          <h1 className="text-2xl border-b-2 inline">Create Account</h1>
          <form
            className="my-4 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col mb-4">
              <label htmlFor="email">Name</label>
              <input
                name="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                name="confirm-password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="error-message text-red-500 mb-4">
              {errorMessage}
            </div>
            <div>
              <input
                className="submit-button"
                type="submit"
                value="Create Account"
              ></input>
              <button>
                <Link to="/">Cancel</Link>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

CreateAccount.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default CreateAccount;
