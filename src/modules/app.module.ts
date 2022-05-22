import { Module } from '@nestjs/common';
import { AppController } from 'src/controllers/app/app.controller';
import { AppService } from 'src/services/app/app.service';
import { ApiModule } from './api.module';

@Module({
  imports: [ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
