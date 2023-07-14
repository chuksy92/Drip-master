const Input = ({ name, onChange, errors, placeholder, type }) => {
  return (
    <>
      <input
        className="px-4 py-2 rounded border-2"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      {errors && <div className="text-sm text-red-500">{errors}</div>}
    </>
  );
};

export default Input;
