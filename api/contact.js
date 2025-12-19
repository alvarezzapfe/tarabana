const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
const clamp = (s, max) => String(s || "").trim().slice(0, max);

module.exports = async function handler(req, res) {
  // CORS (no molesta)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", method: req.method });
  }

  try {
    // 1) Validar env vars ANTES de tocar Resend
    const missing = [];
    if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
    if (!process.env.CONTACT_TO_EMAIL) missing.push("CONTACT_TO_EMAIL");
    if (!process.env.CONTACT_FROM_EMAIL) missing.push("CONTACT_FROM_EMAIL");
    if (missing.length) {
      return res.status(500).json({ error: "Missing env vars", missing });
    }

    // 2) Import dinámico (funciona incluso si resend es ESM)
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 3) Body (Vercel suele parsear JSON; esto lo hace tolerante)
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const { name, email, company, message, source } = body;

    const cleanName = clamp(name, 120);
    const cleanEmail = clamp(email, 180);
    const cleanCompany = clamp(company, 180);
    const cleanMessage = clamp(message, 4000);
    const cleanSource = clamp(source || "tarabana.mx", 120);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({ error: "Campos requeridos faltantes" });
    }
    if (!emailOk(cleanEmail)) return res.status(400).json({ error: "Email inválido" });
    if (cleanMessage.length < 10) {
      return res.status(400).json({ error: "Mensaje muy corto (mín. 10 caracteres)" });
    }

    const out = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `Nuevo contacto Tarabaña — ${cleanName}`,
      text: `Nuevo contacto desde ${cleanSource}

Nombre: ${cleanName}
Email: ${cleanEmail}
Empresa: ${cleanCompany || "-"}
Mensaje:
${cleanMessage}
`,
      replyTo: cleanEmail,
    });

    if (out?.error) {
      return res.status(500).json({
        error: "Resend error",
        details: out.error?.message || out.error,
      });
    }

    return res.status(200).json({ ok: true, id: out?.data?.id || null });
  } catch (err) {
    // Ahora sí: si algo falla, te lo devuelve en JSON (no crash)
    return res.status(500).json({
      error: "Unhandled server error",
      details: err?.message || String(err),
    });
  }
};
