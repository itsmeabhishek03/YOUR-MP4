import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from '@/lib/db'

export async function POST(request:NextRequest) {
    try {
        const { email, password } =  await request.json()
    
        if(!email || !password){
            return NextResponse.json(
                {
                    message: "Email and Password is Required",
                    status: 400
                }
            )
        }
    
        await connectToDatabase()
    
        const existingUser =  await User.findOne({ email })
    
        if(existingUser){
            return NextResponse.json(
                {
                    message: "User already exist",
                    status: 400
                }
            )
        }
    
        User.create({ email, password})
    
        return NextResponse.json(
            {
                message: "User Created Successfully",
                status: 200
            }
        )
    } catch (error) {
        console.error("Registration error", error);
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 400 }
        );
    }
}