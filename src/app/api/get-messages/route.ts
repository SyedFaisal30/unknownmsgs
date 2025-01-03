import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import mongoose from "mongoose";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET (request: Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    console.log(session);

    const _user : User =session?.user

    if(!session || !_user){
        return Response.json(   
            {
                success : false,
                message : "Not Authenticated"
            },
            {
                status : 401
            }
        );
    }

    const userId = new mongoose.Types.ObjectId(_user._id);

    try {
        const user = await UserModel.aggregate(
            [
                {$match : {_id : userId}},
                {$unwind : "$messages"},
                {$sort : {"messages.createdAt" : -1}},
                {$group : {_id : "$_id",messages : {$push : "$messages"}}}
            ]
        ).exec();
        console.log(user);  // Check the response from the aggregation


        if (!user ||  user.length === 0) {
            return Response.json(
                {
                    success : false,
                    messages : "user not found"
                },
                {
                    status : 404
                }
            );
        }

        return Response.json(
            {
                success : true,
                messages : user[0].messages
            },
            {
                status : 200,
            }
        )
    } catch (error) {
        console.error("An unexpected Error Occured ",error);
        return Response.json(
            {
                success : false,
                message : "Internal Server error"
            },
            {
                status : 500
            }
        );
    }
}