import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = ({ setToken, getPatients }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn(email, password)
      .then(function (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      })
      .then(function () {
        navigate("/signed-in");
      });
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-[200px] mr-4">
        <p>
          Easy SOAP takes the mess out of electronic medical records. EMR
          systems should make your life easier, not harder. Login or create an
          account today.
        </p>
      </div>
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
          <Link to="create-account">
            <button>Create account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
