export async function register() {
  console.log("[instrumentation] register() — NODE_ENV:", process.env.NODE_ENV);
  console.log("[instrumentation] PAYLOAD_SECRET:", process.env.PAYLOAD_SECRET ? "SET" : "NOT SET");
  console.log("[instrumentation] DATABASE_URL:", process.env.DATABASE_URL || "(not set)");
  console.log("[instrumentation] NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL || "(not set)");
  console.log("[instrumentation] NEXT_PUBLIC_BUILDER_API_KEY:", process.env.NEXT_PUBLIC_BUILDER_API_KEY ? "SET" : "NOT SET");

  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      console.log("[instrumentation] Loading payload config...");
      const config = await import("@payload-config");
      console.log("[instrumentation] payload config loaded OK:", typeof config.default);
    } catch (err) {
      console.error("[instrumentation] ERROR loading payload config:", err);
    }
  }
}
