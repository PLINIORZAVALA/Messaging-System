import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuerService } from './issuer.service';
import { IssuerController } from './issuer.controller';
import { IssuerKey } from 'src/entity/IssuerKey.entity';
import { Credential } from 'src/entity/credential.entity';
import { Issuer } from 'src/entity/Issuer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Issuer, IssuerKey, Credential])],
  controllers: [IssuerController],
  providers: [IssuerService],
})
export class IssuerModule {}