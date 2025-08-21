import { create } from "zustand";
import toast from "react-hot-toast";
import { io, type Socket } from "socket.io-client";

import API from "../lib/axios";
import { navigate } from "../lib/navigation";

export interface IUser {
  id?: string;
  email?: string;
  fullName?: string;
  password?: string;
  profilePic?: string;
  createdAt?: string;
}

type ResponseType = {
  message: string;
  user: IUser;
};

export type APIError = {
  status?: number;
  message?: string;
};

type UseAuthStoreType = {
  user: IUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: Socket | null;
  checkAuth: () => void;
  signup: (data: IUser) => void;
  login: (data: IUser) => void;
  logout: () => void;
  updateProfile: (data: IUser) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

const BASE_URL = import.meta.env.MODE == "development" ? "http://localhost:5001" : "/"

const useAuthStore = create<UseAuthStoreType>((set, get) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const data: { user: IUser } = await API.get("/auth/check");
      set({ user: data.user });
      get().connectSocket();
    } catch (err) {
      console.error("Error in checkAuth", err);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res: ResponseType = await API.post("/auth/register", data);
      set({ user: res.user });
      toast.success("Account created successfully");
      navigate("/", { replace: true });
      get().connectSocket();
    } catch (err: unknown) {
      const error = err as APIError;
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res: ResponseType = await API.post("/auth/login", data);
      set({ user: res.user });
      toast.success("Logged in successfully!");
      navigate("/", { replace: true });
      get().connectSocket();
    } catch (err: unknown) {
      const error = err as APIError;
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await API.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
      get().disconnectSocket();
    } catch (err: unknown) {
      const error = err as APIError;
      toast.error(error.message || "Something went wrong");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res: ResponseType = await API.put("/auth/update-profile", data);
      set({ user: res.user });
      toast.success("Profile updated successfully");
    } catch (err: unknown) {
      const error = err as APIError;
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { user, socket } = get();
    if (!user || socket?.connected) return;

    const skt = io(BASE_URL, {
      query: {
        userId: user.id,
      },
    });
    skt.connect();
    set({ socket: skt });

    skt.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useAuthStore;
