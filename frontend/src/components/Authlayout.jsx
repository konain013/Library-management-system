function AuthLayout({ title, subtitle, children }) {
  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "#f5f7fb" }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{ width: "100%", maxWidth: "450px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold">{title}</h2>
          <p className="text-muted">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;