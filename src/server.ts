import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import app from "./app.js";

async function main() {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`✅ Server listening on http://localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});