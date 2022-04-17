const LogoutButton = ({ logout }) => {
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
