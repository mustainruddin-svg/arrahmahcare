import { execSync } from "child_process";
import { createClient } from "@libsql/client";

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error("❌ Error: TURSO_DATABASE_URL is not set.");
    console.error("   Please set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in your environment or .env file.");
    process.exit(1);
  }

  console.log(`📡 Connecting to Turso database: ${url}`);
  const client = createClient({ url, authToken });

  console.log("⚙️  Generating schema DDL from Prisma datamodel...");
  const ddl = execSync(
    "npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script",
    { encoding: "utf-8" }
  );

  console.log("🚀 Executing DDL statements on Turso cloud database...");
  await client.executeMultiple(ddl);
  console.log("✅ Schema successfully synced to Turso!");

  console.log("🌱 Running seed data on Turso...");
  execSync("npx tsx prisma/seed.ts", {
    stdio: "inherit",
    env: {
      ...process.env,
      TURSO_DATABASE_URL: url,
      TURSO_AUTH_TOKEN: authToken,
    },
  });

  console.log("🎉 Turso database initialization complete and ready for production!");
}

main().catch((err) => {
  console.error("❌ Failed to sync Turso database:", err);
  process.exit(1);
});
