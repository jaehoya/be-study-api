import { Request, Response } from "express";
import { User } from "../models/User.js";

export async function register(req: Request, res: Response) {
  const { email, name, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: "Email already in use" });
  const user = await User.create({ email, name, password });
  req.session.userId = user.id;
  res.status(201).json({ id: user.id, email: user.email, name: user.name });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  req.session.userId = user.id;
  res.json({ id: user.id, email: user.email, name: user.name });
}

export function logout(req: Request, res: Response) {
  req.session.destroy(() => {
    res.clearCookie("sid");
    res.json({ ok: true });
  });
}

export async function me(req: Request, res: Response) {
  if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });
  const user = await User.findById(req.session.userId).select("email name");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}