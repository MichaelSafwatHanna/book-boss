import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV !== 'production' ? ['.env.development'] : ['.env'],
    }),
  ],
})
export class AppModule {}
