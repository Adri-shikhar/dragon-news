
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// MongoClient connects lazily on first operation (mongodb v4+), no explicit connect() needed.
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("dragon-news");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
});