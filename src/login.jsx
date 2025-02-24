// src/login.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import "./assets/css/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simula la verificación (aquí iría tu lógica real)
    setTimeout(() => {
      setLoading(false);
      setError("Usuario no registrado, contacta administrador");
    }, 2000);
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-card" data-aos="fade-up">
          <h2 className="login-title">Iniciar Sesión</h2>
          <p className="login-subtitle">Ingresa tus credenciales</p>
          {!loading && (
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="text"
                name="username"
                placeholder="Usuario"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="login-submit">
                Enviar Información
              </button>
            </form>
          )}
          {loading && (
            <div className="loading-spinner">{/* Spinner animado */}</div>
          )}
          {error && !loading && <div className="login-error">{error}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
