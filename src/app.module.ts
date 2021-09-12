import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandService } from './command.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CommandService],
})
export class AppModule {}
