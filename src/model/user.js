import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
