function Button({ text ,type ="submit" }) {
  return (
    <button type = {type} className="btn btn-primary w-100 py-2 fw-semibold">
      {text}
    </button>
  );
}

export default Button;