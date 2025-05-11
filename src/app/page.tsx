import Image from "next/image";
import styles from "./page.module.css";
import Hat from "@/components/hat";
import roconomy from "@/lib/roconomy";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const LatestLimiteds = await roconomy.GetLatestLimiteds();
    const LatestRobloxHats = (await roconomy.GetLatestRobloxHats()).slice(0, 7);

    return (
        <div className="bg-gray-900" style={{ padding: "24px", width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
            <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "2.5rem", color: "#fff", marginBottom: "8px" }}>Roconimons</h1>
                <p style={{ fontSize: "1.25rem", color: "#fff", marginBottom: "4px" }}>Rolimon's but for RoConomy</p>
                <p style={{ fontSize: "0.875rem", color: "#aaa" }}>this is so unfinished pls dont cry</p>
            </div>

            <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "16px" }}>Latest Limiteds</h2>
                <p style={{ fontSize: "0.875rem", color: "#aaa", marginBottom: "16px" }}>
                    Last checked: {new Date().toLocaleString()}
                </p>
                <div style={{ display: "flex", overflowX: "auto", gap: "16px", paddingBottom: "8px" }}>
                    {LatestLimiteds.map((item) => {
                        let price = item.lowestPrice != null ? item.lowestPrice.toString() : item.price?.toString() ?? "";
                        if (price.length > 12) {
                            price = price.slice(0, 12) + "...";
                        }
                        const canBuy = item.isForSale || item.lowestPrice != null;
                        return (
                            <Hat
                                key={item.id}
                                ItemId={item.id}
                                ItemName={item.name}
                                Creator={item.creatorName}
                                Price={price}
                                LimitedType={item.isLimited ? (item.isLimitedUnique ? "LimitedUnique" : "Limited") : null}
                                Onsale={canBuy}
                            />
                        );
                    })}
                </div>
            </section>

            <section>
                <h2 style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "8px" }}>Latest Roblox Hats</h2>
                <p style={{ fontSize: "0.875rem", color: "#aaa", marginBottom: "16px" }}>
                    Last checked: {new Date().toLocaleString()}
                </p>
                <div style={{ display: "flex", overflowX: "auto", gap: "16px", paddingBottom: "8px" }}>
                    {LatestRobloxHats.map((item) => {
                        let price = item.price != null ? item.price.toString() : "";
                        if (price.length > 12) {
                            price = price.slice(0, 12) + "...";
                        }
                        const canBuy = item.isForSale || item.lowestPrice != null;
                        return (
                            <Hat
                                key={item.id}
                                ItemId={item.id}
                                ItemName={item.name}
                                Creator={item.creatorName}
                                Price={price}
                                LimitedType={item.isLimited ? (item.isLimitedUnique ? "LimitedUnique" : "Limited") : null}
                                Onsale={canBuy}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
