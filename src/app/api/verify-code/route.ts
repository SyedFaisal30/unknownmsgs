import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(request:Request){
    await dbConnect();

    try {
        const {username,code} = await request.json();
        const decodeUsername=decodeURIComponent(username);
        const user=await UserModel.findOne({username:decodeUsername,verifyCode:code});

        if(!user){
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },
                {
                    status:404
                }
            );
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true;
            await user.save();

            return Response.json(
                {
                    success:true,
                    message:"Account verified successfully"
                },
                {
                    status:200
                }
            );
        } else if (!isCodeNotExpired){
            return Response.json(
                {
                    success:false,
                    message:"Verification code expired"
                },
                {
                    status:400
                }
            )
        }else{
            return Response.json(
                {
                    success:false,
                    message:"Invalid verification code"
                },
                {
                    status:400
                }
            )
        }
    } catch (error) {
        console.error("Error in verifying user",error);
        return Response.json(
            {
                success:false,
                message:"Failed to verify user"
            },
            {
                status:400
            }
        );
    }
}