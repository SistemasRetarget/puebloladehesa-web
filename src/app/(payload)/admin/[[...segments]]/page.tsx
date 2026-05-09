/* Payload admin page */
import type { Metadata } from "next";
import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

async function Page({ params, searchParams }: Args) {
  console.log("[admin/page] rendering — NODE_ENV:", process.env.NODE_ENV);
  console.log("[admin/page] PAYLOAD_SECRET:", process.env.PAYLOAD_SECRET ? "SET" : "NOT SET");
  console.log("[admin/page] DATABASE_URL:", process.env.DATABASE_URL || "(not set)");
  try {
    return await RootPage({ config, params, searchParams, importMap });
  } catch (err) {
    console.error("[admin/page] CRASH in RootPage:", err);
    throw err;
  }
}

export default Page;
