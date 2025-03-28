import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
            credentials:{
                email:{label:'Email or Username',type:'text'},
                password:{label:'Password',type:'password'},
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect();
                console.log("Credentials received:", credentials);
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.email},
                            {username:credentials.identifier},
                        ],
                    });
                    console.log("Found user:", user)
                    if(!user){
                        throw new Error("User not found with this Email!!");
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account before logging in");
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect Password");
                      }
                      return user;
                } catch (err: any)  {
                    throw new Error(err.message || "Something went wrong during login.");                }
            },
        }),
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id = user._id?.toString(); // Convert ObjectId to string
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if(token){
                token._id = token._id?.toString(); // Convert ObjectId to string
                token.isVerified = token.isVerified;
                token.isAcceptingMessages = token.isAcceptingMessages;
                token.username = token.username;
            }
            return session;
        },
    },
    session:{
        strategy:'jwt',
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/sign-in',
    },
};