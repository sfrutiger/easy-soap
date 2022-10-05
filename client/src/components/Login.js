import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const Login = ({ getPatients }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const { signIn, user } = UserAuth();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/signed-in");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Enter your email");
    } else if (!password) {
      setError("Enter your password");
    } else {
      signIn(email, password).then(function (error) {
        if (error) {
          setError(error.message);
        } else {
          navigate("/signed-in");
        }
      });
    }
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
      <div className="border-2 p-2 max-w-[50%]">
        <h1 className="text-2xl border-b-2 inline">Login</h1>
        <form
          className="my-4 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col mb-4 max-w-[100%]">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4 max-w-[100%]">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="error-message mb-4">{error}</div>
          <div className="max-w-[100%] flex flex-col items-center">
            <input
              className="submit-button"
              type="submit"
              value="Login"
            ></input>
          </div>
        </form>
        <div className="my-4 flex flex-col items-center max-w-[100%]">
          <h2>New user?</h2>
          <Link to="create-account" className="max-w-[100%]">
            <button className="submit-button">Create account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
