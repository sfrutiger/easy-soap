import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setToken, getPatients }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async () => {
    axios
      .post("api/auth", {
        email: email,
        password: password,
      })
      .then(function (response) {
        setToken(response.data.token);
        getPatients();
      })
      .catch(function (error) {
        setErrorMessage("Invalid credentials!");
        setTimeout(() => setErrorMessage(""), 5000);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="border-2 p-2">
        <h1 className="text-2xl border-b-2 inline">Login</h1>
        <form
          className="my-4 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
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
          <div className="error-message text-red-500 mb-4">{errorMessage}</div>
          <div>
            <input
              className="submit-button ml-2"
              type="submit"
              value="Login"
            ></input>
          </div>
        </form>
        <div className="my-4 flex flex-col items-center">
          <h2>New user?</h2>
          <button>
            <Link to="create-account">Create account</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
