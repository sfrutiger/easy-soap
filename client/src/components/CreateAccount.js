import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreateAccount = ({ setToken }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // Create new user
  const createUser = () => {
    axios.post("/api/users", {
      name: name,
      email: email,
      password: password,
    });
  };

  // Login user
  const loginUser = async () => {
    axios
      .post("api/auth", {
        email: email,
        password: password,
      })
      .then(function (response) {
        setToken(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser();
  };

  return (
    <div className="w-full flex justify-center mt-8">
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
          {/*   <div className="flex flex-col mb-4">
            <label htmlFor="password">Confirm Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
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
    </div>
  );
};

CreateAccount.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default CreateAccount;
