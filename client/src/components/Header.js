import LogoutButton from "./LogoutButton";
import { UserAuth } from "../context/AuthContext";

const Header = () => {
  const { user } = UserAuth();
  return (
    <header className="text-center mb-4">
      <h1 className="text-2xl sm:text-4xl">Easy SOAP</h1>
      <h2 className="border-b-2 text-xs sm:text-base">
        A web-based EMR system that's easy to use and easy to look at
      </h2>
      {user ? <LogoutButton /> : ""}
    </header>
  );
};

export default Header;
