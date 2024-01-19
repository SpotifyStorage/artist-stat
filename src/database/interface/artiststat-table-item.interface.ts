export interface ArtiststatTableItem {
    partitionKey: string; //artistUri
    rowKey: string;
    follower: number;
    monthlyListener: number;
    worldRank: number;
    timestamp?: Date;
}