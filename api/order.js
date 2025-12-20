// api/order.js
const clamp = (s, max) => String(s || "").trim().slice(0, max);
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const missing = [];
    if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
    if (!process.env.CONTACT_TO_EMAIL) missing.push("CONTACT_TO_EMAIL");
    if (!process.env.CONTACT_FROM_EMAIL) missing.push("CONTACT_FROM_EMAIL");
    if (missing.length) return res.status(500).json({ error: "Missing env vars", missing });

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = req.body && typeof req.body === "object" ? req.body : {};
    const customer = body.customer || {};
    const items = Array.isArray(body.items) ? body.items : [];

    const name = clamp(customer.name, 120);
    const email = clamp(customer.email, 180);
    const phone = clamp(customer.phone, 60);
    const address = clamp(customer.address, 240);
    const notes = clamp(body.notes, 1200);
    const source = clamp(body.source || "tarabana.mx/shop", 120);

    if (!name || !email || !phone) return res.status(400).json({ error: "Faltan datos del cliente" });
    if (!emailOk(email)) return res.status(400).json({ error: "Email inválido" });
    if (items.length < 1) return res.status(400).json({ error: "Selecciona al menos 1 producto" });

    // sanitiza items
    const cleanItems = items.slice(0, 20).map((it) => ({
      name: clamp(it?.name, 140),
      id: clamp(it?.id, 40),
      qty: Math.max(1, Math.min(999, Number(it?.qty || 1))),
    }));

    const lines = cleanItems
      .map((it) => `- ${it.name} (x${it.qty}) [${it.id}]`)
      .join("\n");

    const subject = `Nueva orden / cotización Tarabaña — ${name}`;
    const text = `Nueva orden desde: ${source}

Cliente:
Nombre: ${name}
Email: ${email}
WhatsApp: ${phone}
Dirección: ${address || "-"}

Productos:
${lines}

Notas:
${notes || "-"}

`;

    const out = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL, // luis@tarabana.mx
      replyTo: email,
      subject,
      text,
    });

    if (out?.error) {
      return res.status(500).json({ error: "Resend error", details: out.error?.message || out.error });
    }

    return res.status(200).json({ ok: true, id: out?.data?.id || null });
  } catch (err) {
    return res.status(500).json({ error: "Unhandled server error", details: err?.message || String(err) });
  }
};
