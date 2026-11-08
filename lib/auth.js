import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// Reuse one Mongo connection in dev (hot reload) and in serverless.
const globalForMongo = globalThis;
const client = globalForMongo._bookNookMongo ?? new MongoClient(process.env.MONGODB_URI);
globalForMongo._bookNookMongo = client;
const db = client.db(process.env.DB_NAME || "booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false, // after registering, the reader is sent to the Login page
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  // Issues the JWT that the Express server verifies (public keys at /api/auth/jwks)
  plugins: [jwt(), nextCookies()],
});
