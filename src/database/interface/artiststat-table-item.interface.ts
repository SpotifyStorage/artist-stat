export interface ArtiststatTableItem {
    partitionKey: string;   // => artistUri
    rowKey: string;         // => date
    follower: number;
    monthlyListener: number;
    worldRank: number;
    timestamp?: Date;
}