import { ServiceBusReceivedMessage } from "@azure/service-bus"
import { ArtiststatDto } from "src/database/interface/artiststat.dto"

export interface ArtistStatQueueMessageBody extends ServiceBusReceivedMessage {
    body: ArtiststatDto[]
}

