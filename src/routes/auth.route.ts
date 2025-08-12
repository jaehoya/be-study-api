import { Router } from "express";
import { z } from "zod";
import { validate } from "../middlewares/validate.js";
import * as auth from "../controllers/auth.controller.js";

const router = Router();

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
});

router.post("/register", validate(registerSchema), auth.register);
router.post("/login", validate(loginSchema), auth.login);
router.post("/logout", auth.logout);
router.get("/me", auth.me);

export default router;