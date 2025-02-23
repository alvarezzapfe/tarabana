// App.jsx - HOME de Website de Tarabaña enero 2025
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/navbar.css";
import "./assets/css/index.css";
import "./assets/css/login.css";
import "./assets/css/contact.css";
import "./assets/css/taproom.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import heroBackgroundImage from "./assets/images/fv.jpg";
import magma from "./assets/images/magma.jpg";

import aro from "./assets/images/aro-rojo.png";
import ensenada from "./assets/images/ebf.png";
import cervezaMexico from "./assets/images/cerveza-mexico.png";

// Importar componentes y módulos de react-router
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

// Componentes globales
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Login from "./login";
import Contact from "./contact";
import TapRoom from "./TapRoom";

// Logo (si lo necesitas en otras secciones)
import Logo from "./assets/images/tara.png";

// Array de cervezas
const beers = [
  { name: "Sílice", style: "Czech Pils", abv: "5.1%", ibu: "25", hops: "Saaz" },
  {
    name: "Magma",
    style: "Doble IPA",
    abv: "8.5%",
    ibu: "55",
    hops: "Citra, Mosaic",
  },
  {
    name: "Caliza",
    style: "Hazy IPA",
    abv: "5.2%",
    ibu: "30",
    hops: "Idaho 7, Centennial",
  },
  {
    name: "Chula Vista",
    style: "West Coast IPA",
    abv: "5.0%",
    ibu: "35",
    hops: "Amarillo, Centennial",
  },
  {
    name: "Brisa",
    style: "Session IPA",
    abv: "4.5%",
    ibu: "25",
    hops: "Simcoe, Chinook",
  },
];

// Componente para mostrar cada cerveza
const BeerCard = ({ beer }) => (
  <div className="beer-card" data-aos="fade-up">
    <div className="beer-card-content">
      <div className="beer-icon">
        <i className="fas fa-beer fa-3x"></i>
      </div>
      <h5 className="beer-name">{beer.name}</h5>
      <p className="beer-style">
        <strong>Estilo:</strong> {beer.style}
      </p>
      <p className="beer-abv">
        <strong>ABV:</strong> {beer.abv}
      </p>
      <p className="beer-ibu">
        <strong>IBUs:</strong> {beer.ibu}
      </p>
      <p className="beer-hops">
        <strong>Lúpulos:</strong> {beer.hops}
      </p>
    </div>
  </div>
);

// Componente para scroll suave a la sección indicada por el hash
const ScrollToHash = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);
  return null;
};

const awardsData = [
  { name: "Aro Rojo", location: "Monterrey", img: aro },
  { name: "Ensenara Beer Fest", location: "Cocepa Ensenada", img: ensenada },
  { name: "Cerveza México", location: "Ciudad de México", img: cervezaMexico },
];

const Awards = () => (
  <section id="premios" className="awards-section">
    <div className="container">
      <h2 className="section-title">Premios y Competencias</h2>
      <div className="awards-grid">
        {awardsData.map((award, index) => (
          <div className="award-card" key={index} data-aos="fade-up">
            <img src={award.img} alt={award.name} />
            <h3>{award.name}</h3>
            <p>{award.location}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Componente Home con secciones integradas
const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-out-cubic", once: true });
    document.documentElement.style.setProperty(
      "--hero-background-image",
      `url(${heroBackgroundImage})`
    );
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <header id="hero" className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content text-center">
            <h1 className="hero-title">Bienvenido a Tarabaña</h1>
            <p className="hero-subtitle">
              La experiencia definitiva en cerveza artesanal.
            </p>
            <button className="hero-button btn btn-light">Descubre más</button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-wrapper">
          <div className="about-image">
            <img src={magma} alt="Sobre Tarabaña" />
          </div>
          <div className="about-text">
            <h2>Acerca de Tarabaña</h2>
            <p>
              Tarabaña es una experiencia sensorial donde cada sorbo de nuestra
              cerveza artesanal cuenta una historia. Fusionamos el arte y el
              sabor para crear momentos inolvidables.
            </p>
            <p>
              Nuestro compromiso es con la calidad y la innovación, ofreciendo
              espacios únicos para disfrutar de la tradición cervecera.
            </p>
          </div>
        </div>
      </section>

      {/* Cervezas Section */}
      <section id="cervezas" className="beers-section">
        <div className="container">
          <h2 className="section-title">Nuestra Selección</h2>
          <div className="beer-grid">
            {beers.map((beer, index) => (
              <BeerCard key={index} beer={beer} />
            ))}
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section id="historia" className="history-section">
        <div className="container">
          <h2 className="section-title">Nuestra Historia</h2>
          <div className="timeline">
            {[
              {
                year: "2021",
                title: "Fundación",
                description:
                  "Comenzamos con la visión de revolucionar la cerveza artesanal.",
              },
              {
                year: "2022",
                title: "Primeras Cervezas",
                description:
                  "Iniciamos la producción de nuestros primeros lotes.",
              },
              {
                year: "2023",
                title: "Redirección",
                description:
                  "Optimizamos nuestros procesos para enfocarnos en la calidad.",
              },
              {
                year: "2024",
                title: "Premios y Reconocimientos",
                description:
                  "Recibimos medallas y reconocimientos en competencias nacionales.",
              },
            ].map((event, index) => (
              <div className="timeline-item" key={index} data-aos="fade-up">
                <div className="timeline-date">{event.year}</div>
                <div className="timeline-content">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medallas y Competencias Section */}
      <Awards />

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/TapRoom" element={<TapRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
