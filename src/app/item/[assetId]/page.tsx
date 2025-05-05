import roconomy from "@/lib/roconomy";
import AssetPageClient from "./client";

export default async function AssetPage({ params }: { params: { assetId: string } }) {
    const assetId = parseInt((await params).assetId, 10);

    if (Number.isNaN(assetId)) {
        return <h1 className="text-red-500">Invalid asset ID</h1>;
    }

    let assetInfo;
    try {
        assetInfo = await roconomy.GetAssetInfo(assetId);
    } catch (error) {
        return <h1 className="text-red-500">{String(error)}</h1>;
    }

    let rapData = null;
    try {
        rapData = await roconomy.GetResaleInfo(assetId);
    } catch (error) {
        console.error("Error fetching resale info:", error);
    }

    return <AssetPageClient assetId={assetId} assetInfo={assetInfo} rapData={rapData} />;
}