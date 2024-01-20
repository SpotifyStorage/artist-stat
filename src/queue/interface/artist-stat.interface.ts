import { CustomDate } from "src/date";

export interface ArtistStat {
    uri: string;
    follower: number;
    monthlyListener: number;
    worldRank: number;
    date: CustomDate;
}