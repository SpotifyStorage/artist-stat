import { ServiceBusReceivedMessage } from "@azure/service-bus"
import { ArtistStat } from "./artist-stat.interface"

export interface ArtistStatQueueMessageBody extends ServiceBusReceivedMessage {
    body: ArtistStat[]
}

