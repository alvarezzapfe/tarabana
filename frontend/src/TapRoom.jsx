// src/pages/TapRoom.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

// Componentes reutilizables
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Asset
import tapPhoto from "./assets/images/tap.png";

const TapRoom = () => {
  return (
    <div className="taproom-container">
      {/* Navbar */}
      <Navbar />

      {/* Sección de Información del Bar */}
      <section id="info" className="taproom-info-section">
        <div className="container">
          <h2 className="info-title text-center">Sobre Nuestro Tap Room</h2>
          <div className="row align-items-center">
            {/* Imagen del Bar */}
            <div className="col-md-6 mb-4">
              <img
                src={tapPhoto}
                alt="Interior del Bar"
                className="info-image img-fluid rounded shadow-lg"
              />
            </div>
            {/* Datos Relevantes */}
            <div className="col-md-6">
              <div className="info-content">
                <p>
                  <strong>Dirección:</strong> Tamaulipas 224, Ciudad de México
                </p>
                <p>
                  <strong>Horario:</strong> Lunes a Domingo: 5:00 PM - 2:00 AM
                </p>
                <p>
                  Sumérgete en un ambiente moderno y sofisticado donde la
                  tradición cervecera se une con la innovación para brindarte
                  una experiencia única. Disfruta de espacios exclusivos y la
                  mejor selección de cervezas artesanales.
                </p>
                {/* Mapa incrustado */}
                <div className="map-responsive mb-3">
                  <iframe
                    title="Ubicación del Tap Room"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4356.008628749712!2d-99.18063422427761!3d19.40717444149143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff681b47f5c1%3A0x995429ffa3a930e1!2sAv.%20Tamaulipas%20224%2C%20Hip%C3%B3dromo%2C%20Cuauht%C3%A9moc%2C%2006100%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e1!3m2!1ses-419!2smx!4v1740336579458!5m2!1ses-419!2smx"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
                <Link to="/reservation" className="btn info-btn mt-3">
                  Reserva tu Mesa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TapRoom;
