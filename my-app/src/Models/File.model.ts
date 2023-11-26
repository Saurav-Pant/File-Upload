import mongoose, { Schema } from "mongoose";

const FileSchema: Schema = new Schema({
  Content: { type: String, required: true },
  fileLink: { type: String, required: true },
});

const FileModel = mongoose.models.File || mongoose.model("File", FileSchema);

export default FileModel;
