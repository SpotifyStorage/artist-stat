import { ArtiststatTableItem } from "./artiststat-table-item.interface";


export class ArtiststatDto {
    uri: string;
    followers: number;
    monthlyListeners: number;
    worldRank: number;
    date: string;

    static fromTableItem(tableItem: ArtiststatTableItem): ArtiststatDto {
        return {
            uri: tableItem.partitionKey,
            followers: tableItem.followers,
            monthlyListeners: tableItem.monthlyListeners,
            worldRank: tableItem.worldRank,
            date: tableItem.rowKey,
        }
    }
}
