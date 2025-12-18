import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, company, message, source } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Campos requeridos faltantes" });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!to || !from) {
      return res.status(500).json({ error: "Faltan env vars CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL" });
    }

    const subject = `Nuevo contacto Tarabaña — ${name}`;
    const text = `
Nuevo contacto desde ${source || "tarabana.mx"}

Nombre: ${name}
Email: ${email}
Empresa: ${company || "-"}
Mensaje:
${message}
    `;

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error enviando correo" });
  }
}
