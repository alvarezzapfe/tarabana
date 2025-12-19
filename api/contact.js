import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
const clamp = (s, max) => String(s || "").trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
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

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: "Falta RESEND_API_KEY" });
    if (!to || !from) return res.status(500).json({ error: "Faltan CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL" });

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
      replyTo: cleanEmail,
    });

    return res.status(200).json({ ok: true, id: out?.data?.id || null });
  } catch (err) {
    console.error("CONTACT_API_ERROR:", err);
    return res.status(500).json({ error: "Error enviando correo" });
  }
}
