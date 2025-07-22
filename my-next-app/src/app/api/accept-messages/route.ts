import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request:Request) {

    await dbConnect()

    const session= await getServerSession(authOptions)

    const user:User= session?.user as User

    if(!session || !session.user){
        return Response.json({

            success:false,
            message:"Not Authenticated"
        },{status:401})}
    
    const userId=user._id
    const {acceptMessages}= await request.json()

    try{

        const updateduser= await UserModel.findByIdAndUpdate(userId,
            {
                isAcceptingMessage:acceptMessages
            },{
                new:true
            }
        )
        if(!updateduser){
            return Response.json({
                success:false,
                message:"failed to update user status to accept messages "
            },{status:401})
        }

        return Response.json({
            success:true,
            message:"Message acceptance status updated successfully",updateduser
        },{status:200})
    }
    catch{
        return Response.json({
            success:false,
            message:"failed to update user status to accept messages "
        },{status:500})
    }
    
    
}

export async function GET() {

    await dbConnect()

    const session= await getServerSession(authOptions)

    const user:User= session?.user as User

    if(!session || !session.user){
        return Response.json({

            success:false,
            message:"Not Authenticated"
        },{status:401})}
    
    const userId=user._id
    try {
        const founduser= await UserModel.findById(userId)
        if(!founduser){
            return Response.json({
                success:false,
                message:"User not found"
            },{status:404})
        }

        return Response.json({
            success:true,
            isAcceptingMessages:founduser.isAcceptingMessage
        },{status:200})

        
    } catch{
        return Response.json({
            success:false,
            message:"Error in getting acceptance status."
        },{status:500})
    }
    
    
    
}
