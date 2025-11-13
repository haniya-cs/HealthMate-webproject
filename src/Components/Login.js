import React, { useState } from "react";
import styles from "../styles/login.module.css"; 

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome, ${formData.email}!`);
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
          <a href="/register" className={styles.link}>
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
