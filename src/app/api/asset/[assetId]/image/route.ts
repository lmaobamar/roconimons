import { NextResponse } from 'next/server';
import User from "@/lib/roconomy";

const cache = new Map<number, { data: Buffer, timestamp: number }>();
const CACHE_DURATION = 60 * 1000;

export const dynamic = 'force-dynamic';

interface RouteParams {
    params: {
        assetId: string;
    };
}

export async function GET(_req: Request, context: RouteParams) {
    const assetId = Number(context.params.assetId);

    try {
        const cached = cache.get(assetId);
        const now = Date.now();
        if (cached && now - cached.timestamp < CACHE_DURATION) {
            return new NextResponse(cached.data, {
                status: 200,
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'public, max-age=60',
                    'Vary': 'Accept-Encoding',
                    'ETag': `asset-${assetId}`,
                },
            });
        }

        const image = await User.GetAssetImage(assetId);
        cache.set(assetId, { data: image, timestamp: now });

        return new NextResponse(image, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=60',
                'Vary': 'Accept-Encoding',
                'ETag': `asset-${assetId}`,
            },
        });
    } catch (error) {
        return new NextResponse(null, {
            status: 500,
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    }
}

export const config = {
    runtime: 'edge',
};