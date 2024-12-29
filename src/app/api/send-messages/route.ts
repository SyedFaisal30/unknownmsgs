import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { Message } from "@/models/User.model";

export async function POST (request : Request) {
    dbConnect();

    const { username , content } = await request.json();

    try {
        const user = await UserModel.findOne({ username }); 
        if (!user) {
            return Response.json(
                {
                    success : false,
                    message : "User not found"
                },
                {
                    status : 404
                }
            );
        }
        if(!user.isAcceptingMessages){
            return Response.json(
                {
                    success : false,
                    message : "User is not accepting messages"
                },
                {
                    status : 403
                }
            );
        }

        const newMessage = { content , createdAt: new Date() };

        user.messages.push(newMessage as Message);

        await user.save();

        return Response.json(
            {
                sucess : true,
                message : "Message sent successfully"
            },
            {
                status : 200
            }
        );
    } catch (error) {
        console.error("Error sending message", error);
        return Response.json(
            {
                success : false,
                message : "Failed to send message"
            },
            {
                status : 500
            }
        );
    }
}