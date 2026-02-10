import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { IngestionModule } from './ingestion/ingestion.module';
@Module({
  imports: [DatabaseModule, IngestionModule,
    AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
