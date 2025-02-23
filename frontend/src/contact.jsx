// src/pages/Contact.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import "./assets/css/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario (API, email, etc.)
    console.log("Mensaje enviado:", formData);
    setStatus("¡Mensaje enviado, gracias por contactarnos!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <Navbar />
      <section className="contact-section py-5">
        <div className="container">
          <h1 className="contact-title text-center mb-4" data-aos="fade-up">
            Contáctanos
          </h1>
          <p className="contact-subtitle text-center mb-5" data-aos="fade-up">
            ¿Tienes alguna duda, comentario o sugerencia? Estamos aquí para
            ayudarte.
          </p>
          <div className="row">
            {/* Formulario de Contacto */}
            <div className="col-md-6" data-aos="fade-right">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tuemail@ejemplo.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Mensaje
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary contact-submit"
                >
                  Enviar Mensaje
                </button>
                {status && (
                  <div className="alert alert-success mt-3" role="alert">
                    {status}
                  </div>
                )}
              </form>
            </div>
            {/* Información de Contacto */}
            <div className="col-md-6" data-aos="fade-left">
              <div className="contact-info">
                <h3>Información de Contacto</h3>
                <p>
                  <strong>Dirección:</strong> Tamaulipas 224, Ciudad de México
                </p>
                <p>
                  <strong>Teléfono:</strong> +52 123 456 7890
                </p>
                <p>
                  <strong>Email:</strong> contacto@tarabana.mx
                </p>
                <div className="map-responsive mt-4">
                  <iframe
                    title="Ubicación de Tarabaña"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.3339014412114!2d-99.1730251844462!3d19.421321586844707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fbb8f09e16e1%3A0x5d49ad396c3bd3e1!2sTamaulipas%20224!5e0!3m2!1ses-419!2smx!4v1637693963417!5m2!1ses-419!2smx"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
