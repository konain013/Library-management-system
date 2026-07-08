import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser } from "../services/authService";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Success message ke liye state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      console.log("Login Success:", data);
      
      // Screen par success message dikhane ke liye
      setSuccess("Login Successful");
      
      // Form fields ko khali karne ke liye (Optional)
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your account."
    >
      <form onSubmit={handleSubmit}>
        
        {/* Error Alert */}
        {error && <div className="alert alert-danger p-2 small">{error}</div>}

        {/* Success Alert */}
        {success && <div className="alert alert-success p-2 small">{success}</div>}

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="d-flex justify-content-end mb-3">
          <Link
            to="/forgot-password"
            className="text-decoration-none small"
          >
            Forgot Password?
          </Link>
        </div>

        <Button 
          type="submit" 
          text={loading ? "Signing In..." : "Sign In"} 
          disabled={loading} 
        />

        <p className="text-center mt-4 mb-0">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-decoration-none fw-semibold"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default SignIn;