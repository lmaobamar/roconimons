import { NextResponse } from 'next/server';
import User from "@/lib/roconomy";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
    const { userId } = await params;
    const image = await User.GetUserAvatar(parseInt(userId), false);
    return new NextResponse(image, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}