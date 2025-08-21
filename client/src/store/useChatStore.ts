import { create } from "zustand";
import toast from "react-hot-toast";

import API from "../lib/axios";
import type { APIError, IUser } from "./useAuthStore";
import useAuthStore from "./useAuthStore";

export interface IMessage {
  senderId?: string;
  receiverId?: string;
  text?: string;
  image?: string | null;
  createdAt?: string;
}

type ChatStoreType = {
  messages: IMessage[];
  users: IUser[];
  selectedUser: IUser | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  setSelectedUser: (user: IUser | null) => void;
  getUsers: () => void;
  getMessages: (userId: string) => void;
  sendMessage: (data: IMessage) => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
};

export const useChatStore = create<ChatStoreType>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res: { users: IUser[] } = await API.get("/messages/users");
      set({ users: res.users });
    } catch (err: unknown) {
      const error = err as APIError;
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res: { messages: IMessage[] } = await API.get(
        `/messages/${userId}`
      );
      set({ messages: res.messages });
    } catch (err: unknown) {
      const error = err as APIError;
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data: IMessage) => {
    const { selectedUser, messages } = get();

    if (!selectedUser) return;

    try {
      const res: { newMessage: IMessage } = await API.post(
        `/messages/send/${selectedUser.id}`,
        data
      );
      set({ messages: [...messages, res.newMessage] });
    } catch (err) {
      const error = err as APIError;
      toast.error(error.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const { socket } = useAuthStore.getState();

    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser.id) return;
      set((state) => ({ messages: [...state.messages, newMessage] }));
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    socket?.off("newMessage");
  },
}));
