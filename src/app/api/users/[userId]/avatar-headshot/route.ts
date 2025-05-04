import { NextResponse } from 'next/server';
import User from "@/lib/roconomy";

export async function GET(request: Request, {params}: any) {
    const userId = await params.userId;
    const image = await User.GetUserAvatar(parseInt(userId), true);
    return new NextResponse(image, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}