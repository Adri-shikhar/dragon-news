import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // No baseURL needed — BetterAuth uses the current origin automatically.
  // This works for both localhost and any deployed URL (Vercel, etc.)
});

export const { signIn, signUp, useSession, signOut } = authClient;