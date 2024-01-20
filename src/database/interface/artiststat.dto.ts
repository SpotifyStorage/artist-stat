import { CustomDate } from "src/date";
import { ArtiststatTableItem } from "./artiststat-table-item.interface";


export class ArtiststatDto {
    uri: string;
    follower: number;
    monthlyListener: number;
    worldRank: number;
    date: CustomDate;

    static fromTableItem(tableItem: ArtiststatTableItem): ArtiststatDto {
        return {
            uri: tableItem.partitionKey,
            follower: tableItem.follower,
            monthlyListener: tableItem.monthlyListener,
            worldRank: tableItem.worldRank,
            date: new CustomDate(tableItem.rowKey),
        }
    }
}
