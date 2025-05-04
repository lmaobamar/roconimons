import { NextResponse } from 'next/server';
import User from "@/lib/roconomy";

export async function GET(request: Request, {params}: any) {
    const userId = await params.userId;
    const user = await User.GetUser(parseInt(userId));
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
}