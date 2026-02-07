import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema",
  out: "./db/migrations",
  dialect: "mysql",
});
