// src/shop.js
export const PRODUCTS = [
  {
    id: "pet20",
    name: "Barril PET 20L",
    desc: "Ideal para eventos. Ligero y práctico.",
    tag: "20 litros",
  },
  {
    id: "steel20",
    name: "Barril Acero 20L",
    desc: "Para quien se pone serio. Flow profesional.",
    tag: "20 litros",
  },
  {
    id: "mix24",
    name: "Caja surtida (24)",
    desc: "Mix de estilos. Perfecta para probar.",
    tag: "24 pack",
  },
  {
    id: "line24",
    name: "Caja chela de línea (24)",
    desc: "Tu favorita en modo abastecimiento.",
    tag: "24 pack",
  },
  {
    id: "hoodie",
    name: "Sudadera Tarabaña",
    desc: "Merch oficial. Edición limitada.",
    tag: "Merch",
  },
];

export const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

export function buildItemsPayload(selected, qtyById) {
  return Object.entries(selected)
    .filter(([, v]) => Boolean(v))
    .map(([id]) => {
      const qty = Math.max(1, Number(qtyById[id] || 1));
      const p = PRODUCTS.find((x) => x.id === id);
      return { id, name: p?.name || id, qty };
    });
}
