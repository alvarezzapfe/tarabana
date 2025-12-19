// src/shop.jsx
import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/css/shop.css";

import CanImg from "./assets/images/tap.png"; // imagen provisional (ya existe en tu proyecto)
import { PRODUCTS, buildItemsPayload, emailOk } from "./shopData";


export default function Shop() {
  const [selected, setSelected] = useState(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.id, false]))
  );
  const [qty, setQty] = useState(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.id, 1]))
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState({ state: "idle", msg: "" }); // idle|loading|ok|error

  const items = useMemo(() => buildItemsPayload(selected, qty), [selected, qty]);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      emailOk(form.email) &&
      form.phone.trim().length >= 8 &&
      items.length >= 1 &&
      status.state !== "loading"
    );
  }, [form, items.length, status.state]);

  const toggle = (id) => {
    setSelected((s) => {
      const next = { ...s, [id]: !s[id] };
      // si lo activas, asegura qty mínimo 1
      if (!s[id]) setQty((q) => ({ ...q, [id]: Math.max(1, Number(q[id] || 1)) }));
      return next;
    });
  };

  const setQtySafe = (id, v) => {
    const n = Number(v);
    const safe = Number.isFinite(n) ? Math.max(1, Math.min(999, n)) : 1;
    setQty((q) => ({ ...q, [id]: safe }));
  };

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();

    // honeypot: no alertar bots
    if (hp.trim()) {
      setStatus({ state: "ok", msg: "Listo. Te mandamos tu cotización pronto 🙌" });
      return;
    }

    if (!canSubmit) {
      setStatus({
        state: "error",
        msg: "Falta: nombre, email válido, WhatsApp y mínimo 1 producto seleccionado.",
      });
      return;
    }

    try {
      setStatus({ state: "loading", msg: "Enviando..." });

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
          },
          items,
          notes: form.notes.trim(),
          source: "tarabana.mx/shop",
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await res.json().catch(() => ({}))
        : { error: await res.text().catch(() => "") };

      if (!res.ok) {
        throw new Error(payload?.error || `No se pudo enviar (HTTP ${res.status}).`);
      }

      setStatus({ state: "ok", msg: "Listo. Tu cotización se te hará llegar pronto 🐷✨" });
      setForm({ name: "", email: "", phone: "", address: "", notes: "" });
      setSelected(Object.fromEntries(PRODUCTS.map((p) => [p.id, false])));
      setQty(Object.fromEntries(PRODUCTS.map((p) => [p.id, 1])));
    } catch (err) {
      setStatus({
        state: "error",
        msg: err?.message || "Ocurrió un error. Intenta de nuevo.",
      });
    }
  };

  return (
    <div className="t-shopPage">
      <Navbar />

      <main className="t-shopWrap">
        <div className="t-shopBg" aria-hidden />
        <div className="t-shopGrid" aria-hidden />

        <section className="t-shopCard">
          <header className="t-shopHead">
            <div className="t-kicker">
              <span className="t-dot" aria-hidden />
              Compra en línea (cotización rápida)
            </div>

            <h1 className="t-title">
              Arma tu pedido <span className="t-shineText">bien marrano</span> 🐷
            </h1>

            <p className="t-sub">
              Selecciona productos y manda tu orden. Te respondemos con precio y disponibilidad.
            </p>
          </header>

          <div className="t-shopBody">
            {/* Productos */}
            <section className="t-products">
              {PRODUCTS.map((p) => {
                const active = !!selected[p.id];
                return (
                  <label key={p.id} className={`t-prod ${active ? "is-on" : ""}`}>
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggle(p.id)}
                      aria-label={`Seleccionar ${p.name}`}
                    />

                    <div className="t-prodTop">
                      <img className="t-can" src={CanImg} alt="Producto Tarabaña" />
                      <div className="t-prodMeta">
                        <div className="t-prodName">{p.name}</div>
                        <div className="t-prodTag">{p.tag}</div>
                      </div>
                      <span className="t-check" aria-hidden />
                    </div>

                    <div className="t-prodDesc">{p.desc}</div>

                    <div className="t-prodBottom">
                      <div className="t-qty">
                        <span>Cantidad</span>
                        <input
                          type="number"
                          min={1}
                          max={999}
                          value={qty[p.id]}
                          onChange={(e) => setQtySafe(p.id, e.target.value)}
                          disabled={!active}
                        />
                      </div>

                      <div className="t-hint">
                        {active ? "Seleccionado" : "Seleccionar"}
                      </div>
                    </div>

                    <span className="t-shine" aria-hidden />
                  </label>
                );
              })}
            </section>

            {/* Formulario */}
            <aside className="t-order">
              <form className="t-form" onSubmit={onSubmit}>
                <div className="t-formHead">
                  <h2>Datos para cotizar</h2>
                  <p>Te respondemos lo más rápido posible.</p>
                </div>

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

                <div className="t-row">
                  <div className="t-field">
                    <label>WhatsApp</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="55..."
                      autoComplete="tel"
                      required
                    />
                  </div>

                  <div className="t-field">
                    <label>Dirección (opcional)</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={onChange}
                      placeholder="Colonia / CDMX / etc."
                      autoComplete="street-address"
                    />
                  </div>
                </div>

                <div className="t-field">
                  <label>Notas (opcional)</label>
                  <textarea
                    name="notes"
                    rows={4}
                    value={form.notes}
                    onChange={onChange}
                    placeholder="Fecha del evento, estilo favorito, pickup o envío..."
                  />
                </div>

                {/* honeypot */}
                <input
                  className="t-hp"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <button className="t-submit" type="submit" disabled={!canSubmit}>
                  {status.state === "loading" ? "Enviando..." : "Enviar orden de compra"}
                  <span className="t-submitShine" aria-hidden />
                </button>

                {status.state !== "idle" && (
                  <div className={`t-alert ${status.state}`}>{status.msg}</div>
                )}

                <div className="t-mini">
                  Seleccionados: <b>{items.length}</b> producto(s).
                </div>
              </form>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
