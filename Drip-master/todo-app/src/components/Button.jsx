const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-slate-300 px-4 rounded hover:bg-slate-400 active:bg-slate-500"
    >
      {label}
    </button>
  );
};

export default Button;
