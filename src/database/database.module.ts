import { Global, Module } from '@nestjs/common';
import { AppDataSource } from './datasource';

@Global()
@Module({
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        return AppDataSource.initialize();
      },
    },
  ],
  exports: ['DATA_SOURCE'],
})
export class DatabaseModule {}
