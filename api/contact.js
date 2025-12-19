import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
const clamp = (s, max) => String(s || "").trim().slice(0, max);

export default async function handler(req, res) {
  // --- CORS básico (no estorba si todo es mismo dominio) ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight (MUY común que sea la causa del 405 si hay algo que lo dispara)
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Solo POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", method: req.method });
  }

  try {
    // Validar env vars
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey) return res.status(500).json({ error: "Falta RESEND_API_KEY" });
    if (!to || !from) {
      return res.status(500).json({ error: "Faltan CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL" });
    }

    // Leer body (Vercel lo parsea si viene JSON con header correcto)
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
      return res.status(400).json({ error: "Mensaje muy corto (mínimo 10 caracteres)" });
    }

    const subject = `Nuevo contacto Tarabaña — ${cleanName}`;
    const text = [
      `Nuevo contacto desde ${cleanSource}`,
      "",
      `Nombre: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Empresa: ${cleanCompany || "-"}`,
      "",
      "Mensaje:",
      cleanMessage,
      "",
    ].join("\n");

    const out = await resend.emails.send({
      from,
      to,
      subject,
      text,
      // para que al “Reply” se vaya al cliente
      replyTo: cleanEmail,
    });

    return res.status(200).json({ ok: true, id: out?.data?.id || null });
  } catch (err) {
    console.error("CONTACT_API_ERROR:", err);
    return res.status(500).json({ error: "Error enviando correo" });
  }
}
