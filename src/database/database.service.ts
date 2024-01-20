import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DefaultAzureCredential } from '@azure/identity';
import { StorageSharedKeyCredential  } from '@azure/storage-blob';
import { TableClient } from '@azure/data-tables';
import { ConfigService } from '@nestjs/config';
import { ArtiststatDto } from './interface/artiststat.dto';
import { ArtiststatTableItem } from './interface/artiststat-table-item.interface';

@Injectable()
export class DatabaseService implements OnModuleInit {
    artiststatTableClient: TableClient;
    logger = new Logger(DatabaseService.name)

    constructor(
        private readonly configService: ConfigService
    ) { }

    onModuleInit() {
        //const credentials = new DefaultAzureCredential();
        // this.artiststatTableClient = new TableClient(
        //     this.configService.get('AZURE_TABLE_STORAGE_URL'),
        //     "artiststatistics",
        //     credentials
        // );
        this.artiststatTableClient = new TableClient(
            'https://spotifystoragequeues.table.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-01-20T03:03:42Z&st=2024-01-19T19:03:42Z&spr=https&sig=Gs95MblEpG%2F1xCMdjyH2iJjrWaR6CiJTUNsuC8%2BR3Dw%3D',
            'artiststatistics'
        )
    }

    async addOne(artistStat: ArtiststatDto) {
        this.logger.verbose(`Adding artist statistics data to database (artist:${artistStat.uri})`)
        console.log(artistStat)
        const artiststatTableItem: ArtiststatTableItem = {
            partitionKey: artistStat.uri,
            rowKey: artistStat.date.getNormalizedDate(), /** Generate a unique row key using the current timestamp
            Message à moi-meme: il se pourrait que discovery envoie deux fois le meme "artistStat" donc 2 fois le meme artiste en meme temps donc avec le meme timestamp
            Donc s'il y a un problème d'unicité, il faut retourner à 'rowKey: new Date().toISOString()'             */ 
            follower: artistStat.follower,
            monthlyListener: artistStat.monthlyListener,
            worldRank: artistStat.worldRank,
        }
        console.log(artiststatTableItem)
        return await this.artiststatTableClient.createEntity(artiststatTableItem);
    }

    async addMany(statsOfArtists: ArtiststatDto[]) {
        this.logger.verbose(`Adding statistics data for ${statsOfArtists.length} artists to database`)
        return statsOfArtists.map(async statsOfArtist => await this.addOne(statsOfArtist))
    }

    async getMany(uri: string) {
        this.logger.verbose(`Getting statistics data from database of the following artist '${uri}'`)
        const artiststatsEntities = this.artiststatTableClient.listEntities<ArtiststatTableItem>({
            queryOptions: { filter: `PartitionKey eq '${uri}'` }
        });
        const statsOfArtists: ArtiststatDto[] = [];
        for await (const entity of artiststatsEntities) {
            statsOfArtists.push(ArtiststatDto.fromTableItem(entity));
        }

        return statsOfArtists
    }

    async getOneLatest(uri: string) {
        this.logger.verbose(`Getting latest statistics data from database of the following artist '${uri}'`)
        const artiststatsEntities = this.artiststatTableClient.listEntities<ArtiststatTableItem>({
            queryOptions: { filter: `PartitionKey eq '${uri}'` }
        });
        const statsOfArtists: ArtiststatDto[] = [];
        for await (const entity of artiststatsEntities) {
            statsOfArtists.push(ArtiststatDto.fromTableItem(entity));
        }

        return statsOfArtists
            .reduce((prev, current) => (prev.date > current.date) ? prev : current);
    }

    // async getManyLatestByAlbumUri(albumUri: string) {
    //     this.logger.verbose(`Getting latest statistics data from database for th ${albumUri}`)
    //     //Retrieve all playcount data for the album
    //     const playcountEntities = this.artiststatTableClient.listEntities<ArtiststatTableItem>({ queryOptions: { filter: `albumUri eq '${albumUri}'` } });

    //     const playcountDtos: ArtiststatDto[] = [];

    //     for await (const entity of playcountEntities) {
    //         playcountDtos.push(ArtiststatDto.fromTableItem(entity));
    //     }

    //     //Keeps only the latest playcount data for each track uri
    //     const latestPlaybookDtos = Object.values(groupBy(playcountDtos, 'uri'))
    //         .map(playcountDtos => playcountDtos
    //             .reduce((prev, current) => (prev.date > current.date) ? prev : current));

    //     return latestPlaybookDtos;
    // }

    // async getOneByDate(uri: string, date: number) { //not tested
    //     this.logger.verbose(`Getting artist's statistics data from database: ${uri} on ${date}`)
    //     return this.artiststatTableClient.getEntity<ArtiststatTableItem>(uri, date);
    // }

    // async getManyByDateRange(uri: string, startDate: string, endDate: string) { //not tested
    //     this.logger.verbose(`Getting playcount data from database: ${uri} between ${startDate} and ${endDate}`)
    //     const playcountEntities = this.artiststatTableClient.listEntities<ArtiststatTableItem>({ queryOptions: { filter: odata`PartitionKey eq '${uri}' and RowKey ge '${startDate}' and RowKey le '${endDate}'` } });
    //     const playcountDtos: ArtiststatDto[] = [];
    //     for await (const entity of playcountEntities) {
    //         playcountDtos.push(ArtiststatDto.fromTableItem(entity));
    //     }

    //     return playcountDtos
    // }

}

