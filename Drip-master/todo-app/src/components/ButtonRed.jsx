const ButtonRed = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 px-4 rounded hover:bg-red-400 active:bg-red-300"
    >
      {label}
    </button>
  );
};

export default ButtonRed;
