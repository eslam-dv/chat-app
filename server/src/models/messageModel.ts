import { Schema, model, Types } from "mongoose";

interface IMessage {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  text?: string;
  image?: string;
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    receiverId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    text: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const MessageModel = model<IMessage>("message", messageSchema);

export default MessageModel;
