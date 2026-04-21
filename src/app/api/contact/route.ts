import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const data = {
    nombre: String(form.get("nombre") || ""),
    email: String(form.get("email") || ""),
    mensaje: String(form.get("mensaje") || "")
  };
  // TODO: enviar email / guardar en DB. Por ahora log.
  console.log("[contacto]", data);
  return NextResponse.redirect(new URL("/contacto?ok=1", req.url), 303);
}
