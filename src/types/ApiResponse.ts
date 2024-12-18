import { Message } from "@/models/User.model";
import { boolean } from "zod";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?:Array<Message>
};