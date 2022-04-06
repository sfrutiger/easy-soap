import React from "react";
import axios from "axios";

const LogoutButton = ({ setToken }) => {
  const logout = async () => {
    axios
      .delete("api/auth")
      .then(function () {
        setToken("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <button
      className="w-[100px] absolute right-4 top-4"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
