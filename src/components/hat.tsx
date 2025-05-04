import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { User, BadgeDollarSign, Layers } from 'lucide-react'
import Image from "next/image"

interface LimitedProps {
    ItemId: number
    ItemName: string
    Creator: string
    Price: number | string | null
    LimitedType: string | null
    Onsale: boolean
}

function Hat({ ItemId, ItemName, Creator, Price, LimitedType, Onsale }: LimitedProps) {
    return (
        <Card className="w-[200px] bg-gray-800 text-white rounded-lg shadow-lg">
            <CardHeader className="p-2">
                <CardTitle className="text-lg font-semibold truncate text-center">{ItemName}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center p-2 relative">
                <Image
                    src={`/api/asset/${ItemId}/image`}
                    alt={ItemName}
                    width={128}
                    height={128}
                    className="object-contain"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiMzMzMzMzMiLz48L3N2Zz4="
                />
                {(LimitedType === "Limited" || LimitedType === "LimitedUnique") && (
                    <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '-18px', left: '50%', transform: 'translateX(-50%)' }}>
                        <img
                            src={LimitedType === "Limited" ? "/Limited.png" : "/LimitedU.png"}
                            alt={LimitedType === "Limited" ? "Limited" : "Limited Unique"}
                            className=""
                            style={{ transform: "scale(1, 0.45)", height: "63px" }}
                        />
                    </div>
                )}
            </CardContent>
            <Separator className="bg-gray-700" />
            <CardContent className="p-2 text-sm pl-5">
                <p className="text-gray-400 flex items-center gap-1 pl-1">
                    <User className="w-4 h-4 mr-2" />
                    {Creator}
                </p>
                {Onsale ? (
                    <p className="text-green-500 flex items-center gap-1 pl-1">
                        <BadgeDollarSign className="w-4 h-4 mr-2" />
                        {Price !== null && isFinite(Number(Price))
                            ? isNaN(Number(Price))
                                ? "Too Many Robux"
                                : `${Number(Price).toLocaleString()} Robux`
                            : (isNaN(Number(Price)) ? "Too Many Robux" : "-")}
                    </p>
                ) : (
                    <p className="text-red-400 flex items-center gap-1 pl-1">
                        <BadgeDollarSign className="w-4 h-4 mr-2" />
                        Not for Sale
                    </p>
                )}
                {LimitedType === "Limited" && (
                    <p className="flex items-center gap-1 text-yellow-400 font-semibold pl-1">
                        <Layers className="w-4 h-4 mr-2" />
                        <span>Limited</span>
                    </p>
                )}
                {LimitedType === "LimitedUnique" && (
                    <p className="flex items-center gap-1 text-pink-500 font-semibold pl-1">
                        <Layers className="w-4 h-4 mr-2" />
                        <span>Limited Unique</span>
                    </p>
                )}
                {LimitedType === null && (
                    <p className="flex items-center gap-1 text-gray-400 font-semibold pl-1">
                        <Layers className="w-4 h-4 mr-2" />
                        <span>None</span>
                    </p>
                )}
            </CardContent>
            <CardFooter className="p-2">
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/item/${ItemId}`}>View</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Hat