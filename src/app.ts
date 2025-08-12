import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todo.route.js";
import { env } from "./config/env.js";

const app = express();

// 기본 미들웨어
app.use(morgan("dev"));
app.use(express.json());

// CORS (React와 연동)
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));

// 세션 (쿠키 이름은 sid)
app.use(session({
  name: "sid",
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: env.MONGODB_URI, collectionName: "sessions" }),
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
  },
}));

// 라우트
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// 헬스체크
app.get("/health", (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

//로그인 기능을 만들어 볼겁니다.
// 에러 핸들러

export default app;