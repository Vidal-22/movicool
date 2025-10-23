import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model("DataModel", dataSchema);
