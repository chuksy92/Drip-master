const ButtonGreen = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 px-4 rounded hover:bg-green-400 active:bg-green-300"
    >
      {label}
    </button>
  );
};

export default ButtonGreen;
