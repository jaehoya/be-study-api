import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string; // hashed
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
  next();
});

UserSchema.methods.comparePassword = function(candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
