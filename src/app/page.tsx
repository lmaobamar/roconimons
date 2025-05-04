import Image from "next/image";
import styles from "./page.module.css";
import Hat from "@/components/hat";
import roconomy from "@/lib/roconomy";
import { Separator } from "@/components/ui/separator";

const cardFrameStyle: React.CSSProperties = {
  background: "#23272f",
  borderRadius: "18px",
  padding: "28px 24px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
  marginBottom: "32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

export default async function Home() {
  const LatestLimiteds = await roconomy.GetLatestLimiteds();
  const LatestRobloxHats = await roconomy.GetLatestRobloxHats();
  return (
    <main className={styles.main}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", width: "100%" }}>
        <div style={{ width: "fit-content", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "4rem", color: "#fff" }}>Roconimons</h1>
            <p style={{ fontSize: "2rem", color: "#fff" }}>Rolimon's but for RoConomy</p>
            <p className="text-muted" style={{ fontSize: "1rem", color: "#fff" }}>this is so unfinished pls dont cry</p>
          </div>
          <div style={{ ...cardFrameStyle, width: "fit-content" }}>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "2rem", color: "#fff" }}>Latest Limiteds</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "nowrap", gap: "20px", overflowX: "auto" }}>
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
          </div>
          <div style={{ ...cardFrameStyle, width: "100%" }}>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "2rem", color: "#fff" }}>Latest Roblox Hats</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "nowrap", gap: "20px", overflowX: "auto" }}>
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
          </div>
        </div>
      </div>
    </main>
  );
}