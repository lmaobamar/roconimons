// * Everything to do with RoConomy
import axios from 'axios';

const UserAgent = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
    }
}

export type User = {
    id: number;
    name: string;
    displayName: string;
    description: string;
    created: Date;
    isBanned: boolean;
    postCount: number;
    discordId?: string;
    staffStatus: boolean;
    placeVisits: number;
};

export type UserAvatarInfo = {
    targetId: number;
    state: string;
    imageUrl: string;
};

export type AssetInfo = {
    itemType: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export type AssetDetails = {
    id: number;
    assetType: number;
    name: string;
    description: string;
    genres: string[];
    creatorType: string;
    creatorTargetId: number;
    creatorName: string;
    offsaleDeadline: Date | null;
    itemRestrictions: string[];
    saleCount: number;
    itemType: string
    favoriteCount: number;
    isForSale: boolean;
    price: number | null;
    priceTickets: number | null;
    lowestPrice: number | null;
    isLimited: boolean;
    isLimitedUnique: boolean;
    priceStatus: string;
    lowestSellerData: SellerData | null;
    unitsAvailableForConsumption: null;
    serialCount: number | null;
    is18Plus: boolean;
    moderationStatus: string;
    createdAt: Date;
    updatedAt: Date;
}

export type SellerData = {
    userId: number;
    username: string;
    userAssetId: number;
    price: number;
    assetId: number;
}

export type InventoryAPIData = {
    IsValid: boolean;
    Data: InventoryItemData;
}

export type InventoryItemData = {
    TotalItems: number;
    Start: number;
    End: number;
    Page: number;
    nextPageCursor: string | null;
    previousPageCursor: string | null;
    ItemsPerPage: number;
    PageType: string;
    Items: InventoryItem[];
}

export type InventoryItem = {
    AssetRestrictionIcon: {
        CssTag: string;
    };
    Item: {
        AssetId: number;
        UniverseId: number | null;
        Name: string;
        AbsoluteUrl: string;
        AssetType: number;
    };
    Creator: {
        Id: number;
        Name: string;
        Type: number;
        CreatorProfileLink: string;
    };
    Product: {
        PriceInRobux: number;
        SerialNumber: number | null;
    };
    PrivateSeller: any;
    Thumbnail: Record<string, unknown>;
    UserItem: Record<string, unknown>;
}

async function GetUser(id: number): Promise<User> {
    const url = `https://rocono.xyz/apisite/users/v1/users/${id}`;
    const response = await axios.get(url, UserAgent);
    const user: User = response.data;
    return user;
}

/**
 * Retrieves the avatar image from RoConomy.
 * @param id - The unique numeric ID of the user.
 * @param headshot - If true, fetches the user's headshot image; if false, fetches the full-body avatar image.
 * @returns A PNG image.
 */
async function GetUserAvatar(id: number, headshot: boolean) {
    let url: string;
    if (headshot) {
        url = `https://rocono.xyz/apisite/thumbnails/v1/users/avatar-headshot?userIds=${id}&size=420x420&format=png`;
    } else {
        url = `https://rocono.xyz/apisite/thumbnails/v1/users/avatar?userIds=${id}&size=420x420&format=png`;
    }
    const response = await axios.get(url, UserAgent);
    const info = response.data.data[0] as UserAvatarInfo;
    const imageUrl = `https://rocono.xyz${info.imageUrl}`;
    // const imageName = `${info.imageUrl.substring(1)}`;

    const image = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        headers: UserAgent.headers
    });
    const imageBuffer = Buffer.from(image.data, 'binary');
    return imageBuffer;
}

async function GetAssetImage(id: number) {
    const url = `https://rocono.xyz/Thumbs/Asset.ashx?assetId=${id}`;
    const response = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: UserAgent.headers
    });
    const imageBuffer = Buffer.from(response.data, 'binary');
    return imageBuffer;
}

async function GetLatestLimiteds() {
    const latest_lims_res = await axios.get("https://rocono.xyz/apisite/catalog/v1/search/items?category=Collectibles&limit=7&sortType=0" ,UserAgent);
    const latest_lims = latest_lims_res.data.data as AssetInfo[];

    const ids = latest_lims.map((item) => item.id);
    
    const item_info_res = await axios.get(`https://rocono.xyz/apisite/catalog/v1/catalog/items/details?assetIds=${ids.join(",")}`, UserAgent);
    const item_info = item_info_res.data.data as AssetDetails[];

    return item_info;
}

async function GetLatestRobloxHats() {
    const latest_hats_res = await axios.get("https://rocono.xyz/users/inventory/list-json?userId=1&assetTypeId=8&cursor=&itemsPerPage=7", UserAgent);
    const latest_hats = latest_hats_res.data as InventoryAPIData;
    const latest_hats_items = latest_hats.Data.Items as InventoryItem[];

    const ids = latest_hats_items.map((item) => item.Item.AssetId);

    const item_info_res = await axios.get(`https://rocono.xyz/apisite/catalog/v1/catalog/items/details?assetIds=${ids.join(",")}`, UserAgent);
    const item_info = item_info_res.data.data as AssetDetails[];

    const latest_hats_info = latest_hats_items.map((item) => {
        const info = item_info.find((info) => info.id === item.Item.AssetId);
        return {
            id: item.Item.AssetId,
            name: item.Item.Name,
            creatorName: item.Creator.Name,
            price: info?.price,
            isLimited: info?.isLimited,
            isLimitedUnique: info?.isLimitedUnique,
            lowestPrice: info?.lowestPrice,
            isForSale: item.Product.PriceInRobux > 0,
        };
    }).filter(hat => !hat.isLimited && !hat.isLimitedUnique);

    return latest_hats_info;
}

export default {
    GetUser,
    GetUserAvatar,
    GetAssetImage,
    GetLatestLimiteds,
    GetLatestRobloxHats,
}