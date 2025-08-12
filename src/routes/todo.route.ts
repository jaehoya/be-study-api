import { Router } from "express";
import { z } from "zod";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import * as ctrl from "../controllers/todo.controller.js";

const router = Router();

const createSchema = z.object({ body: z.object({ title: z.string().min(1), tags: z.array(z.string()).optional() }) });
const updateSchema = z.object({ body: z.object({ title: z.string().min(1).optional(), completed: z.boolean().optional(), tags: z.array(z.string()).optional() }), params: z.object({ id: z.string().min(1) }) });
const idParam = z.object({ params: z.object({ id: z.string().min(1) }) });

router.use(requireAuth);

router.get("/", ctrl.list);
router.post("/", validate(createSchema), ctrl.create);
router.put("/:id", validate(updateSchema), ctrl.update);
router.delete("/:id", validate(idParam), ctrl.remove);

export default router;