// src/shop.jsx
import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./assets/css/shop.css";

import CanImg from "./assets/images/tap.png"; // imagen provisional
import { PRODUCTS, buildItemsPayload, emailOk } from "./shopData";

const StepPill = ({ n, title, active, done }) => (
  <div className={`t-stepPill ${active ? "is-active" : ""} ${done ? "is-done" : ""}`}>
    <div className="t-stepNum">{done ? "✓" : n}</div>
    <div className="t-stepTxt">
      <div className="t-stepTitle">{title}</div>
      <div className="t-stepSub">{active ? "Ahora" : done ? "Listo" : "Siguiente"}</div>
    </div>
  </div>
);

export default function Shop() {
  // wizard step: 1 start, 2 products, 3 details
  const [step, setStep] = useState(1);

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

  const canGoStep2 = true; // step 1 solo es start
  const canGoStep3 = items.length >= 1;

  const canSubmit = useMemo(() => {
    return (
      items.length >= 1 &&
      form.name.trim().length >= 2 &&
      emailOk(form.email) &&
      form.phone.trim().length >= 8 &&
      status.state !== "loading"
    );
  }, [items.length, form, status.state]);

  const toggle = (id) => {
    setSelected((s) => {
      const next = { ...s, [id]: !s[id] };
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

  const go = (n) => setStep(n);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (hp.trim()) {
      setStatus({ state: "ok", msg: "Listo. Te mandamos tu cotización pronto 🙌" });
      return;
    }

    if (!canSubmit) {
      setStatus({
        state: "error",
        msg: "Falta: nombre, email válido, WhatsApp y mínimo 1 producto.",
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

      if (!res.ok) throw new Error(payload?.error || `No se pudo enviar (HTTP ${res.status}).`);

      setStatus({ state: "ok", msg: "Listo. Tu cotización se te hará llegar pronto 🐷✨" });

      // reset & regresar a paso 1 (opcional)
      setForm({ name: "", email: "", phone: "", address: "", notes: "" });
      setSelected(Object.fromEntries(PRODUCTS.map((p) => [p.id, false])));
      setQty(Object.fromEntries(PRODUCTS.map((p) => [p.id, 1])));
      setStep(1);
    } catch (err) {
      setStatus({ state: "error", msg: err?.message || "Ocurrió un error. Intenta de nuevo." });
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
            <div className="t-headRow">
              <div>
                <div className="t-kicker">
                  <span className="t-dot" aria-hidden />
                  Compra en línea · Cotización rápida
                </div>

                <h1 className="t-title">
                  Compra <span className="t-shineText">Tarabaña</span>
                </h1>

                <p className="t-sub">
                  3 pasos. Sin fricción. Te respondemos con precio y disponibilidad.
                </p>
              </div>

              <div className="t-steps">
                <StepPill n="1" title="Comenzar" active={step === 1} done={step > 1} />
                <StepPill n="2" title="Seleccionar" active={step === 2} done={step > 2} />
                <StepPill n="3" title="Datos" active={step === 3} done={false} />
              </div>
            </div>
          </header>

          <div className="t-wiz">
            {/* STEP 1 */}
            {step === 1 && (
              <section className="t-panel t-panel--center t-animIn">
                <div className="t-startCard">
                  <div className="t-startGlow" aria-hidden />
                  <img className="t-startCan" src={CanImg} alt="Tarabaña" />
                  <h2>Listo para comprar?</h2>
                  <p>
                    Entra al flujo de compra/cotización. Selecciona productos y manda tu pedido.
                  </p>

                  <div className="t-startBtns">
                    <button className="t-btnPrimary" onClick={() => canGoStep2 && go(2)}>
                      Comenzar a comprar
                      <span className="t-btnShine" aria-hidden />
                    </button>
                    <a className="t-btnGhost" href="/contact">
                      Mejor quiero contacto
                    </a>
                  </div>

                  <div className="t-mini">
                    Tip: puedes pedir barriles, cajas o merch. Respuesta típica el mismo día.
                  </div>
                </div>
              </section>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <section className="t-panel t-animIn">
                <div className="t-panelTop">
                  <h2>Selecciona productos</h2>
                  <div className="t-panelActions">
                    <button className="t-btnGhost" onClick={() => go(1)}>← Volver</button>
                    <button className="t-btnPrimary" onClick={() => canGoStep3 && go(3)} disabled={!canGoStep3}>
                      Continuar
                      <span className="t-btnShine" aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="t-products">
                  {PRODUCTS.map((p) => {
                    const active = !!selected[p.id];
                    return (
                      <div key={p.id} className={`t-prod ${active ? "is-on" : ""}`}>
                        <button className="t-prodHit" onClick={() => toggle(p.id)} type="button" aria-label={`toggle ${p.name}`}>
                          <span className={`t-check ${active ? "is-on" : ""}`} />
                        </button>

                        <div className="t-prodTop">
                          <img className="t-can" src={CanImg} alt="Producto Tarabaña" />
                          <div className="t-prodMeta">
                            <div className="t-prodName">{p.name}</div>
                            <div className="t-prodTag">{p.tag}</div>
                          </div>
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
                            {active ? "Agregado" : "Agregar"}
                          </div>
                        </div>

                        <span className="t-shine" aria-hidden />
                      </div>
                    );
                  })}
                </div>

                <div className="t-summaryBar">
                  <div>
                    Seleccionados: <b>{items.length}</b>
                  </div>
                  <button className="t-btnPrimary" onClick={() => canGoStep3 && go(3)} disabled={!canGoStep3}>
                    Ir a datos
                    <span className="t-btnShine" aria-hidden />
                  </button>
                </div>
              </section>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <section className="t-panel t-animIn">
                <div className="t-panelTop">
                  <h2>Datos y envío</h2>
                  <div className="t-panelActions">
                    <button className="t-btnGhost" onClick={() => go(2)}>← Volver</button>
                  </div>
                </div>

                <div className="t-step3Grid">
                  {/* Resumen izquierda */}
                  <div className="t-review">
                    <div className="t-reviewHead">
                      <h3>Tu pedido</h3>
                      <div className="t-reviewBadge">{items.length} producto(s)</div>
                    </div>

                    {items.length === 0 ? (
                      <div className="t-empty">
                        No seleccionaste productos. Regresa y agrega algo.
                      </div>
                    ) : (
                      <div className="t-reviewList">
                        {items.map((it) => (
                          <div key={it.id} className="t-reviewRow">
                            <div className="t-reviewName">{it.name}</div>
                            <div className="t-reviewQty">x{it.qty}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="t-mini">
                      Nota: esto es cotización. Te confirmamos precio/disponibilidad por mail/WhatsApp.
                    </div>
                  </div>

                  {/* Form derecha */}
                  <aside className="t-order">
                    <form className="t-form" onSubmit={onSubmit}>
                      <div className="t-row">
                        <div className="t-field">
                          <label>Nombre</label>
                          <input name="name" value={form.name} onChange={onChange} placeholder="Tu nombre" autoComplete="name" required />
                        </div>
                        <div className="t-field">
                          <label>Email</label>
                          <input name="email" value={form.email} onChange={onChange} placeholder="tuemail@ejemplo.com" autoComplete="email" required />
                        </div>
                      </div>

                      <div className="t-row">
                        <div className="t-field">
                          <label>WhatsApp</label>
                          <input name="phone" value={form.phone} onChange={onChange} placeholder="55..." autoComplete="tel" required />
                        </div>
                        <div className="t-field">
                          <label>Dirección (opcional)</label>
                          <input name="address" value={form.address} onChange={onChange} placeholder="Colonia / CDMX / etc." autoComplete="street-address" />
                        </div>
                      </div>

                      <div className="t-field">
                        <label>Notas (opcional)</label>
                        <textarea name="notes" rows={4} value={form.notes} onChange={onChange} placeholder="Fecha del evento, pickup o envío, etc." />
                      </div>

                      <input
                        className="t-hp"
                        value={hp}
                        onChange={(e) => setHp(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      <button className="t-btnPrimary t-btnFull" type="submit" disabled={!canSubmit}>
                        {status.state === "loading" ? "Enviando..." : "Enviar orden / cotización"}
                        <span className="t-btnShine" aria-hidden />
                      </button>

                      {status.state !== "idle" && (
                        <div className={`t-alert ${status.state}`}>{status.msg}</div>
                      )}
                    </form>
                  </aside>
                </div>
              </section>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
