import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// MongoClient connects lazily on first operation (mongodb v4+), no explicit connect() needed.
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("dragon-news-test");

// Resolve the app's base URL for BetterAuth.
// Priority: BETTER_AUTH_URL → VERCEL_PROJECT_PRODUCTION_URL (stable alias) → VERCEL_URL (per-deploy) → localhost
const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

export const auth = betterAuth({
  baseURL: getBaseURL(),
  database: mongodbAdapter(db, { client }),
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    // Explicit override (local .env)
    process.env.BETTER_AUTH_URL,
    // Both known stable Vercel aliases for this project
    "https://dragon-news-obito4.vercel.app",
    "https://dragon-news-phi-sage.vercel.app",
    // Stable production alias — auto-set by Vercel
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null,
    // Per-deployment preview URL — auto-set by Vercel
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});