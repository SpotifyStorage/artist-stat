import { Controller, Get, Query } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('statistics')
export class DatabaseController {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }

    @Get('many/latest')
    @ApiQuery({ name: 'artistUris' })
    getLatestFromManyArtist(@Query('artistUris') artistUris: string) {
        const artists = artistUris.split(',')
        if (artists[artists.length - 1] == '') {
            //return {error: "Last id is not specified."}
            artists.pop()
        }
        return this.databaseService.getLastestFromManyArtists(artists)
    }

    @Get(':artistUri/all')
    @ApiQuery({ name: 'artistUri' })
    getAll(@Query('artistUri') artistUri: string) {
        return this.databaseService.getAllFromOneArtist(artistUri)
    }

    @Get(':artistUri/latest')
    @ApiQuery({ name: 'artistUri' })
    getLatest(@Query('artistUri') artistUri: string) {
        return this.databaseService.getLatestFromOneArtist(artistUri)
    }

    @Get(':artistUri/timeWindow')
    @ApiQuery({ name: 'artistUri' })
    @ApiQuery({ name: 'from' })
    @ApiQuery({ name: 'to' })
    getTimeWindow(@Query('artistUri') artistUri: string, @Query('from') from, @Query('to') to) {
        return this.databaseService.getLatestFromOneArtist(artistUri)
    }

    @Get(':artistUri/:date')
    @ApiQuery({ name: 'artistUri' })
    @ApiQuery({ name: 'date' })
    getByDate(@Query('artistUri') artistUri: string, @Query('date') date: string) {
        return this.databaseService.getByDateFromOneArtist(artistUri, date)
    }


    //4iHNK0tOyZPYnBU7nGAgpQ

}
