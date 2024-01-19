import { ArtiststatTableItem } from "./artiststat-table-item.interface";


export class ArtiststatDto {
    uri: string;
    follower: number;
    monthlyListener: number;
    worldRank: number;
    date: number;

    static fromTableItem(tableItem: ArtiststatTableItem): ArtiststatDto {
        return {
            uri: tableItem.partitionKey,
            follower: tableItem.follower,
            monthlyListener: tableItem.monthlyListener,
            worldRank: tableItem.worldRank,
            date: new Date(tableItem.timestamp).getTime(),
        }
    }
}