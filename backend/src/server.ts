import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";

async function main() {
  await prisma.$connect();
  app.listen(env.port, () => {
    console.log(`🚀 Server running on http://localhost:${env.port}`);
  });
}

main().catch((err) => { console.error(err); process.exit(1); });