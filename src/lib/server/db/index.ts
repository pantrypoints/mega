import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const dev = process.env.NODE_ENV !== "production";

export function getDb(platformEnv?: App.Platform["env"]) {

  // 1. Try using Cloudflare's platformEnv (Production / Preview)
  // 2. If that's missing, fall back to process.env (Local Dev / Bun Seed Script)

  const DATABASE_URL = platformEnv?.DATABASE_URL ?? process.env.DATABASE_URL;
  const DATABASE_AUTH_TOKEN = platformEnv?.DATABASE_AUTH_TOKEN ?? process.env.DATABASE_AUTH_TOKEN;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  // Production requires auth token (Turso)
  if (!dev && !DATABASE_AUTH_TOKEN) {
    throw new Error("DATABASE_AUTH_TOKEN is not set");
  }

  const client = createClient({
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN
  });

  return drizzle(client, { schema });
}



// const dev = process.env.NODE_ENV !== "production";

// import { drizzle } from "drizzle-orm/libsql";
// import { createClient } from "@libsql/client";
// import * as schema from "./schema";
// import { env } from "$env/dynamic/private";

// export function getDb(platformEnv?: App.Platform["env"]) {
//   const DATABASE_URL = platformEnv?.DATABASE_URL ?? env.DATABASE_URL;
//   const DATABASE_AUTH_TOKEN = platformEnv?.DATABASE_AUTH_TOKEN ?? env.DATABASE_AUTH_TOKEN;

//   if (!DATABASE_URL) {
//     throw new Error("DATABASE_URL is not set");
//   }

//   // Production requires auth token (Turso)
//   if (!dev && !DATABASE_AUTH_TOKEN) {
//     throw new Error("DATABASE_AUTH_TOKEN is not set");
//   }

//   const client = createClient({
//     url: DATABASE_URL,
//     authToken: DATABASE_AUTH_TOKEN
//   });

//   return drizzle(client, { schema });
// }





// import { dev } from '$app/environment';
// import { drizzle } from 'drizzle-orm/libsql';
// import { createClient } from '@libsql/client';
// import * as schema from './schema';
// import { env } from '$env/dynamic/private';

// export function getDb(platformEnv?: App.Platform['env']) {
//   const DATABASE_URL = platformEnv?.DATABASE_URL ?? env.DATABASE_URL;
//   const DATABASE_AUTH_TOKEN = platformEnv?.DATABASE_AUTH_TOKEN ?? env.DATABASE_AUTH_TOKEN;

//   if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
//   if (!dev && !DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

//   const client = createClient({
//     url: DATABASE_URL,
//     authToken: DATABASE_AUTH_TOKEN
//   });

//   return drizzle(client, { schema });
// }
