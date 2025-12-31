import React, { useState,} from "react";
import styles from "../styles/login.module.css"; // reuse same styles
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "", fullName: "", });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting signup:", formData); // debug

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          formData
        ),
      });

      const data = await response.json();
      console.log("Response:", data); // debug

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      navigate( "/login");

    } catch (error) {
      console.error("Network error:", error);
      alert("Server is not running");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>HealthMate</h1>
        <h2 className={styles.subtitle}>Create your account</h2>

        <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
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

          <button type="submit" className={styles.btn}>Signup</button>
        </form>

        <p className={styles.linkText}>
          Already have an account?{" "}
          <a href="/login" className={styles.link}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
