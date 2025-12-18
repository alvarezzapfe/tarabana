import React, { useMemo, useState } from "react";
import "../assets/css/whatsapp-widget.css";

export default function WhatsAppWidget({
  phone = "5215580324251", // TODO: cambia al tuyo en formato internacional (MX: 521 + número)
  brand = "Tarabaña",
  defaultMessage = "Hola, quiero información 🙌",
  position = "right", // "right" | "left"
}) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(defaultMessage);

  const waLink = useMemo(() => {
    const text = encodeURIComponent(msg || defaultMessage);
    return `https://wa.me/${phone}?text=${text}`;
  }, [phone, msg, defaultMessage]);

  return (
    <div className={`wa-wrap ${position}`}>
      {/* Launcher */}
      <button
        className="wa-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir WhatsApp"
        title="WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </button>

      {/* Panel */}
      <div className={`wa-panel ${open ? "open" : ""}`} role="dialog" aria-modal="false">
        <div className="wa-head">
          <div className="wa-avatar" aria-hidden>
            <i className="fa-solid fa-beer-mug-empty" />
          </div>
          <div className="wa-headText">
            <div className="wa-title">{brand}</div>
            <div className="wa-sub">Te respondemos rápido</div>
          </div>

          <button className="wa-close" onClick={() => setOpen(false)} aria-label="Cerrar">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="wa-body">
          <label className="wa-label">Mensaje</label>
          <textarea
            className="wa-textarea"
            rows={3}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Escribe tu mensaje…"
          />
          <a className="wa-send" href={waLink} target="_blank" rel="noopener noreferrer">
            Abrir WhatsApp <i className="fa-solid fa-arrow-right" />
          </a>

          <div className="wa-mini">
            Tip: agrega “reservación” o “evento” para que te atiendan más rápido.
          </div>
        </div>
      </div>
    </div>
  );
}
