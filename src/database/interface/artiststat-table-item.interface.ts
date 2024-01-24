export interface ArtiststatTableItem {
    partitionKey: string;   // => artistUri
    rowKey: string;         // => date
    followers: number;
    monthlyListeners: number;
    worldRank: number;
    timestamp?: Date;
}