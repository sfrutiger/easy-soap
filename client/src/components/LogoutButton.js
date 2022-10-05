import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const LogoutButton = () => {
  const logOut = () => {
    return signOut(auth);
  };

  return (
    <button
      className="w-[100px] absolute right-4 top-4"
      onClick={() => logOut()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
