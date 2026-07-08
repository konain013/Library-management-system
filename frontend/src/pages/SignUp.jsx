import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { registerUser } from "../services/authService";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 1. Messages aur loading ke liye states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 2. Client-side validation: Check karein dono passwords match karte hain ya nahi
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser(formData);
      console.log(data);

      // 3. Alert ki jagah success state set karein
      setSuccess("Account created successfully");

      // Form fields ko khali karne ke liye
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error.message);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your account to get started."
    >
      <form onSubmit={handleSubmit}>
        
        {/* 4. Error aur Success Messages UI alerts */}
        {error && <div className="alert alert-danger p-2 small">{error}</div>}
        {success && <div className="alert alert-success p-2 small">{success}</div>}

        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />

        {/* 5. Loading logic button par apply kiya */}
        <Button 
          type="submit"
          text={loading ? "Creating Account..." : "Create Account"} 
          disabled={loading}
        />

        <p className="text-center mt-4 mb-0">
          Already have an account?{" "}
          <Link to="/signin" className="text-decoration-none fw-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default SignUp;