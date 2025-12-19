const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
const clamp = (s, max) => String(s || "").trim().slice(0, max);

module.exports = async function handler(req, res) {
  // CORS (no estorba si todo es mismo dominio)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") return res.status(204).end();

  // Solo POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", method: req.method });
  }

  try {
    // Verifica env vars (sin exponer valores)
    const missing = [];
    if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
    if (!process.env.CONTACT_TO_EMAIL) missing.push("CONTACT_TO_EMAIL");
    if (!process.env.CONTACT_FROM_EMAIL) missing.push("CONTACT_FROM_EMAIL");
    if (missing.length) {
      return res.status(500).json({ error: "Missing env vars", missing });
    }

    const { name, email, company, message, source } = req.body || {};

    const cleanName = clamp(name, 120);
    const cleanEmail = clamp(email, 180);
    const cleanCompany = clamp(company, 180);
    const cleanMessage = clamp(message, 4000);
    const cleanSource = clamp(source || "tarabana.mx", 120);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({ error: "Campos requeridos faltantes" });
    }
    if (!emailOk(cleanEmail)) {
      return res.status(400).json({ error: "Email inválido" });
    }
    if (cleanMessage.length < 10) {
      return res.status(400).json({ error: "Mensaje muy corto (mín. 10 caracteres)" });
    }

    const to = process.env.CONTACT_TO_EMAIL; // pon aquí luis@tarabana.mx vía env
    const from = process.env.CONTACT_FROM_EMAIL;

    const subject = `Nuevo contacto Tarabaña — ${cleanName}`;
    const text = `Nuevo contacto desde ${cleanSource}

Nombre: ${cleanName}
Email: ${cleanEmail}
Empresa: ${cleanCompany || "-"}
Mensaje:
${cleanMessage}
`;

    const out = await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: cleanEmail, // para que al responder te conteste al cliente
    });

    // Resend a veces devuelve { data, error }
    if (out && out.error) {
      return res.status(500).json({
        error: "Resend error",
        details: out.error.message || out.error,
      });
    }

    return res.status(200).json({ ok: true, id: (out && out.data && out.data.id) || null });
  } catch (err) {
    console.error("CONTACT_API_ERROR:", err);
    return res.status(500).json({
      error: "Unhandled server error",
      details: err && err.message ? err.message : String(err),
    });
  }
};
