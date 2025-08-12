import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITodo extends Document {
  user: Types.ObjectId;
  title: string;
  completed: boolean;
  tags: string[];
}

const TodoSchema = new Schema<ITodo>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
}, { timestamps: true });

export const Todo = mongoose.model<ITodo>("Todo", TodoSchema);