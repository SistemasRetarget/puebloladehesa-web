export async function register() {
  console.log("[instrumentation] register() — NODE_ENV:", process.env.NODE_ENV);
  console.log("[instrumentation] PAYLOAD_SECRET:", process.env.PAYLOAD_SECRET ? "SET" : "NOT SET");
  console.log("[instrumentation] DATABASE_URL:", process.env.DATABASE_URL || "(not set)");
  console.log("[instrumentation] NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL || "(not set)");

  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      console.log("[instrumentation] Initializing Payload to apply DB schema (push:true)...");
      const { getPayload } = await import("payload");
      const { default: config } = await import("@payload-config");
      await getPayload({ config });
      console.log("[instrumentation] Payload initialized OK — DB schema applied via push:true");
    } catch (err) {
      console.error("[instrumentation] ERROR initializing Payload:", err);
    }
  }
}
