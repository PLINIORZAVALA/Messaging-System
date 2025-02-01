import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VeramoModule } from './veramo/veramo.module';
import { CredentialsModule } from './credentials/credentials.module';

@Module({
  imports: [VeramoModule, CredentialsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
