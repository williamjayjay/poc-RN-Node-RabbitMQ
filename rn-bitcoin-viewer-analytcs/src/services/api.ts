import axios from "axios";
import { AppError } from "@utils/AppError";
import { io } from "socket.io-client";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: Number(process.env.EXPO_PUBLIC_SMALL_TIMEOUT)
});

const socketUrl = process.env.EXPO_PUBLIC_API_URL;

if (!socketUrl) {
    throw new Error("Socket server URL is not defined in environment variables");
}

const socket = io(socketUrl);

export { api, socket };