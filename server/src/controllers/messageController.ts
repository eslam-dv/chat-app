import cloudinary from "../config/cloudinary";
import { getReceiverSocketId, io } from "../config/socket";
import MessageModel from "../models/messageModel";
import UserModel from "../models/userModle";
import catchError from "../utils/catchError";

const getUsersForSidebar = catchError(async (req, res) => {
  const userId = req.user.id;
  const filteredUsers = await UserModel.find({ _id: { $ne: userId } });

  res.status(200).json({ users: filteredUsers });
});

const getMessages = catchError(async (req, res) => {
  const { id: userToChatId } = req.params;

  const myId = req.user.id;

  const messages = await MessageModel.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  res.status(200).json({ messages });
});

const sendMessage = catchError(async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user.id;

  let imageUrl;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const message = await MessageModel.create({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", message);
  }

  res.status(201).json({ newMessage: message });
});

export { getUsersForSidebar, getMessages, sendMessage };
