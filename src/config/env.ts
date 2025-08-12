
import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 3000),
  MONGODB_URI: process.env.MONGODB_URI ?? "mongodb+srv://jaeho9:a07xKmpFFuRsuqUy@cluster0.g8panpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  SESSION_SECRET: process.env.SESSION_SECRET ?? "your_session_secret",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
};

if (!env.MONGODB_URI) {
  console.warn("[WARN] MONGODB_URI is empty. Did you set .env?");
}
if (!env.SESSION_SECRET) {
  console.warn("[WARN] SESSION_SECRET is empty. Use a strong secret in .env");
}
