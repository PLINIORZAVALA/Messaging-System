import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuerKeyService } from './issuer-key.service';
import { IssuerKeyController } from './issuer-key.controller';
import { IssuerKey } from 'src/entity/IssuerKey.entity';
import { Issuer } from 'src/entity/Issuer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IssuerKey, Issuer])],
  controllers: [IssuerKeyController],
  providers: [IssuerKeyService],
})
export class IssuerKeyModule {}