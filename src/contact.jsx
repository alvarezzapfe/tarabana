import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/css/contact.css";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [hp, setHp] = useState(""); // honeypot anti-bots
  const [status, setStatus] = useState({ state: "idle", msg: "" }); // idle | loading | ok | error

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      emailOk(form.email.trim()) &&
      form.message.trim().length >= 10 &&
      status.state !== "loading"
    );
  }, [form, status.state]);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (hp) return; // bot
    if (!canSubmit) return;

    try {
      setStatus({ state: "loading", msg: "Enviando..." });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          message: form.message.trim(),
          source: "tarabana.mx",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "No se pudo enviar.");

      setStatus({ state: "ok", msg: "Listo. Te contactamos pronto 🙌" });
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      setStatus({
        state: "error",
        msg: err?.message || "Ocurrió un error. Intenta de nuevo.",
      });
    }
  };

  return (
    <div className="t-contactPage">
      <Navbar />

      <main className="t-contactWrap">
        <div className="t-heroBg" aria-hidden />
        <div className="t-heroGrid" aria-hidden />

        <section className="t-contactCard">
          <header className="t-contactHead">
            <h1>Contacto</h1>
            <p>
              Fábrica de Cervezas Tarabaña · cervecería independiente. <br />
              ¿Eventos, colaboraciones, distribuciones o prensa? Escríbenos.
            </p>
          </header>

          <div className="t-contactGrid">
            {/* FORM */}
            <form className="t-form" onSubmit={onSubmit}>
              <div className="t-row">
                <div className="t-field">
                  <label>Nombre</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Tu nombre"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="t-field">
                  <label>Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="tuemail@ejemplo.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="t-field">
                <label>Empresa (opcional)</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  placeholder="Marca / bar / distribuidora"
                />
              </div>

              <div className="t-field">
                <label>Mensaje</label>
                <textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Cuéntanos qué necesitas (mínimo 10 caracteres)..."
                  required
                />
              </div>

              {/* Honeypot hidden */}
              <input
                className="t-hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <button className="t-submit" type="submit" disabled={!canSubmit}>
                {status.state === "loading" ? "Enviando..." : "Enviar"}
                <i className="fa-solid fa-paper-plane" />
              </button>

              {status.state !== "idle" && (
                <div className={`t-alert ${status.state}`}>
                  {status.msg}
                </div>
              )}

              <div className="t-formFine">
                Alternativa rápida: WhatsApp (botón abajo). Respuesta típica el mismo día.
              </div>
            </form>

            {/* INFO */}
            <aside className="t-info">
              <div className="t-infoCard">
                <h3>Taproom</h3>
                <p>
                  Tamaulipas 224, Condesa · CDMX
                  <br />
                  <span className="t-muted">Visítanos o arma un evento.</span>
                </p>

                <div className="t-pills">
                  <a
                    className="t-pill"
                    href="https://www.instagram.com/tarabana.mx/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram" /> Instagram
                  </a>
                  <a
                    className="t-pill"
                    href="https://www.facebook.com/tarabana.mx/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f" /> Facebook
                  </a>
                  <a className="t-pill" href="/taplist">
                    <i className="fa-solid fa-list" /> Tap List
                  </a>
                </div>
              </div>

              <div className="t-map">
                <iframe
                  title="Ubicación Tarabaña"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.3339014412114!2d-99.1730251844462!3d19.421321586844707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fbb8f09e16e1%3A0x5d49ad396c3bd3e1!2sTamaulipas%20224!5e0!3m2!1ses-419!2smx!4v1637693963417!5m2!1ses-419!2smx"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
