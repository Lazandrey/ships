import mongoose from "mongoose";

const shipSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  home_port: { type: String, required: true },
  image: { type: String, required: false },
  roles: { type: Array, required: true },
  year_built: { type: String, required: false },
  mass_kg: { type: String, required: false },
});

export default mongoose.model("Ship", shipSchema);
