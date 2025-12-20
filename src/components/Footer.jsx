// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/tara.png";
import Ema from "../assets/images/ema.png";
import "../assets/css/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="t-footer">
      <div className="t-footerTop" aria-hidden />
      <div className="t-footerGrid" aria-hidden />

      <div className="container t-footerInner">
        {/* EMA (arriba, centrada) */}
        <div className="t-footerEmaWrap">
          <img
            src={Ema}
            alt="EMA"
            className="t-footerEma"
            loading="lazy"
          />
        </div>

        {/* Brand row */}
        <div className="t-footerBrandRow">
          <div className="t-footerBrand">
            <div className="t-footerLogoWrap" aria-hidden="true">
              <img src={Logo} alt="Tarabaña" className="t-footerLogo" />
            </div>

            <div className="t-footerBrandText">
              <h4>Tarabaña</h4>
              <p>Cervecería independiente · CDMX</p>
            </div>
          </div>

          <div className="t-footerSocial">
            <a
              className="t-socialBtn"
              href="https://www.instagram.com/tarabana.mx/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>

            <a
              className="t-socialBtn"
              href="https://www.facebook.com/tarabana.mx/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>

            <a
              className="t-socialBtn"
              href="https://www.untappd.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Untappd"
              title="Untappd"
            >
              <i className="fa-solid fa-beer-mug-empty" />
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="t-footerCols">
          <div className="t-footerCol">
            <h5>Contacto</h5>
            <ul>
              <li>
                <span className="t-footLabel">Email</span>
                <a href="mailto:hola@tarabana.mx">hola@tarabana.mx</a>
              </li>
              <li>
                <span className="t-footLabel">Tel</span>
                <a href="tel:+521234567890">+52 123 456 7890</a>
              </li>
              <li>
                <span className="t-footLabel">Ubicación</span>
                <Link to="/TapRoom">Condesa · CDMX</Link>
              </li>
            </ul>
          </div>

          <div className="t-footerCol">
            <h5>Explorar</h5>
            <ul>
              <li><a href="/#hero">Inicio</a></li>
              <li><a href="/#hoy">Hoy en el tap</a></li>
              <li><a href="/#cervezas">Cervezas</a></li>
              <li><Link to="/taplist">Tap List</Link></li>
              <li><Link to="/shop">Compra</Link></li>
              <li><Link to="/about">Acerca de</Link></li>
            </ul>
          </div>

          <div className="t-footerCol">
            <h5>Taproom</h5>
            <ul>
              <li><Link to="/TapRoom">Ver Taproom</Link></li>
              <li><Link to="/contact">Eventos / Contacto</Link></li>
              <li>
                <a
                  href="https://www.untappd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Untappd
                </a>
              </li>
            </ul>
          </div>

          <div className="t-footerCol t-footerCTA">
            <div className="t-footerCard">
              <div className="t-footerCardTop">
                <div>
                  <h5>¿Vienes hoy?</h5>
                  <p>Checa lo que está saliendo y cae por una pinta.</p>
                </div>
               まして
                <span className="t-footerChip">Live</span>
              </div>

              <div className="t-footerBtns">
                <a className="t-footBtn t-footBtnPrimary" href="/#hoy">
                  Hoy en el tap <i className="fa-solid fa-arrow-right" />
                </a>
                <Link className="t-footBtn" to="/taplist">
                  Tap List
                </Link>
              </div>

              <p className="t-footFine">
                Hecho internamente con{" "}
                <a
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </a>{" "}
                <i className="fab fa-react" />
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="t-footerBottom">
          <div className="t-footerLine" />
          <div className="t-footerBottomRow">
            <p className="t-footerLegal">
              © {year} Compañía Cervecera Tierra Mojada S.A.P.I. de C.V. Todos los derechos reservados.
            </p>
            <div className="t-footerMiniLinks">
              <Link to="/contact">Contacto</Link>
              <span className="t-dot">•</span>
              <Link to="/about">Quiénes somos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
