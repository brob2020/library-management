import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import path from "path";

config({ path: ".env.local" });
export default defineConfig({
  out: "./drizzle",
  schema: "./database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

//npx drizzle-kit push  ----  directly apply changes to your database
//npx drizzle-kit generate
// npx drizzle-kit migrate
