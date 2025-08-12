import { Request, Response } from "express";
import { Todo } from "../models/Todo.js";

export async function list(req: Request, res: Response) {
  const todos = await Todo.find({ user: req.session.userId }).sort({ createdAt: -1 });
  res.json(todos);
}

export async function create(req: Request, res: Response) {
  const todo = await Todo.create({
    user: req.session.userId!,
    title: req.body.title,
    tags: req.body.tags ?? [],
  });
  res.status(201).json(todo);
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const { title, completed, tags } = req.body;
  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.session.userId },
    { $set: { title, completed, tags } },
    { new: true }
  );
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  const deleted = await Todo.findOneAndDelete({ _id: id, user: req.session.userId });
  if (!deleted) return res.status(404).json({ error: "Todo not found" });
  res.json({ ok: true });
}