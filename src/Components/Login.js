import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { Link ,useNavigate} from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const navigate = useNavigate();
 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting:", formData); // debug

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();
    console.log("Response:", data); // debug

    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    navigate("/");

  } catch (error) {
    console.error("Network error:", error);
    alert("Server is not running");
   
  }
};



  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>HealthMate</h1>
        <h2 className={styles.subtitle}>Login to your account</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.btn}>Login</button>
        </form>

        <p className={styles.linkText}>
          Don’t have an account?{" "}
          <Link to="/Signup" className={styles.link}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
