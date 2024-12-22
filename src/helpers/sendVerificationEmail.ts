import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verficationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse> {
    try {
        const emailResponse=await resend.emails.send({
            from:"onboarding@resend.dev",
            to:email,
            subject:"Mystery Message Verfication Code",
            react:VerificationEmail({username,otp:verifyCode}),
        });
        console.log("Email sent successfully:", emailResponse);
        return {success:true,message:"Verification email sent successfully"};
    } catch (emailerror) {
        console.error("Error sending Verfication Email",emailerror);
        return {success:false,message:"Failed to send verification email."};
    }
}