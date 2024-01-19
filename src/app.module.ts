import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { QueueService } from './queue/queue.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ArtiststatDto } from './database/interface/artiststat.dto';

@Module({
    imports: [
        QueueModule,
        DatabaseModule,
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
          }),
    ],
    providers: [DatabaseService],
})
export class AppModule implements OnModuleInit {
    constructor(
        private readonly queueService: QueueService,
        private readonly databaseService: DatabaseService
    ) { }

    logger = new Logger(AppModule.name)

    onModuleInit() {
        const receiver = this.queueService.addReceiver(async message => {
            this.logger.verbose(`Received a messages from the queue containing ${message.body.length} artists with their stats`)
            this.databaseService.addMany(message.body)
        })
    }
}
