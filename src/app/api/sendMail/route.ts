import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:Request) {
    const {email,username}=await request.json();
    const emailResponse=await sendVerificationEmail(email,username,"12345678");

    if(!emailResponse.success){
        return new Response(JSON.stringify({success:false}),{status:400});
    }
    return new Response(JSON.stringify({success:true}),{status:200});
}