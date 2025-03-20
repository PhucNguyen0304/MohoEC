import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  isUserSend: {type:String,required:true},
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  text: {type: String,required:true},
  image: {type: String}
}, { timestamps: true }); // Add timestamps option

const messageModel = mongoose.models.messages || mongoose.model('messages', messageSchema);
export default messageModel;
