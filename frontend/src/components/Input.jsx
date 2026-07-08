
function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control py-2"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;