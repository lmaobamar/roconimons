"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { SquareArrowOutUpRight, User, Tag, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import type { ResaleInfo } from "@/lib/roconomy";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const addZeroRapPoint = (priceDataPoints: { value: number; date: string }[]) => {
    if (!priceDataPoints || priceDataPoints.length === 0) {
        const today = new Date().toISOString();
        return [{ value: 0, date: today }];
    }

    const earliestDate = new Date(
        Math.min(...priceDataPoints.map((point) => new Date(point.date).getTime()))
    );

    const syntheticDate = new Date(earliestDate);
    syntheticDate.setDate(earliestDate.getDate() - 1);

    return [
        { value: 0, date: syntheticDate.toISOString() },
        ...priceDataPoints,
    ];
};

interface AssetInfo {
    name: string;
    creatorName: string;
    price: number | null;
    lowestPrice: number | null;
    isLimited: boolean;
    isLimitedUnique: boolean;
}

export default function AssetPageClient({
    assetId,
    assetInfo,
    rapData,
}: {
    assetId: number;
    assetInfo: AssetInfo;
    rapData: ResaleInfo | null;
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (rapData === null) {
        return (
            <div className="min-h-screen bg-gray-900 text-white px-4 py-12 flex items-center justify-center">
                <h1 className="text-red-500">Error fetching resale information</h1>
            </div>
        );
    }

    const rap = Intl.NumberFormat().format(rapData.recentAveragePrice);
    const getLimitedType = () => {
        if (assetInfo.isLimitedUnique) return "Limited Unique";
        if (assetInfo.isLimited) return "Limited";
        return "None";
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat().format(price);

    const chartData = addZeroRapPoint(rapData.priceDataPoints);

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-12 flex items-center justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center text-center">
                    <Label
                        htmlFor="asset-name"
                        className="text-3xl font-bold mb-0 flex items-center gap-2"
                    >
                        {assetInfo.name}
                        <Link href={`https://rocono.xyz/catalog/${assetId}/---`} passHref>
                            <SquareArrowOutUpRight
                                className="cursor-pointer"
                                size={20}
                                color="#fff"
                            />
                        </Link>
                    </Label>
                    <div className="p-2 mt-6 bg-gray-700 bg-opacity-10 rounded-lg shadow-lg mb-6">
                        <Image
                            src={`https://www.rocono.xyz/Thumbs/Asset.ashx?assetId=${assetId}`}
                            alt={assetInfo.name}
                            width={256}
                            height={256}
                        />
                    </div>

                    <div className="space-y-4 text-left w-full px-4">
                        <div className="flex items-center gap-2">
                            <User className="text-blue-400" size={20} />
                            <Label
                                htmlFor="creator"
                                className="text-blue-400 font-medium text-lg"
                            >
                                Creator:
                            </Label>
                            <span id="creator" className="text-lg">
                                {assetInfo.creatorName}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <DollarSign className="text-green-400" size={20} />
                            <Label
                                htmlFor="price"
                                className="text-green-400 font-medium text-lg"
                            >
                                Price:
                            </Label>
                            <span id="price" className="text-lg">
                                {assetInfo.price !== null
                                    ? `${formatPrice(assetInfo.price)} Robux`
                                    : "Not for Sale"}
                            </span>
                        </div>

                        {(assetInfo.isLimited || assetInfo.isLimitedUnique) && (
                            <div className="flex items-center gap-2">
                                <DollarSign className="text-orange-400" size={20} />
                                <Label
                                    htmlFor="limited"
                                    className="text-orange-400 font-medium text-lg"
                                >
                                    Lowest Price:
                                </Label>
                                <span id="limited" className="text-lg">
                                    {assetInfo.lowestPrice !== null
                                        ? `${formatPrice(assetInfo.lowestPrice)} Robux`
                                        : "Not for Sale"}
                                </span>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <Tag className="text-yellow-400" size={20} />
                            <Label
                                htmlFor="limitedType"
                                className="text-yellow-400 font-medium text-lg"
                            >
                                Limited Type:
                            </Label>
                            <span id="limitedType" className="text-lg">
                                {getLimitedType()}
                            </span>
                        </div>
                    </div>
                </div>

                <Card className="bg-gray-800">
                    <CardHeader>
                        <CardTitle className="text-center">Recent Average Price</CardTitle>
                    </CardHeader>
                    <CardContent className="h-72">
                        <div className="flex items-center justify-center h-full">
                            {isClient && chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(date) => new Date(date).toLocaleDateString()}
                                        />
                                        <YAxis hide domain={[0, "dataMax + 100"]} />
                                        <Tooltip
                                            formatter={(value: number) => [
                                                `${formatPrice(value)} Robux`,
                                                "Price",
                                            ]}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#8884d8"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-center">
                                    <p>{isClient ? "No price data available to display graph." : "Loading chart..."}</p>
                                    <p>RAP: {formatPrice(rapData.recentAveragePrice)} Robux</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}