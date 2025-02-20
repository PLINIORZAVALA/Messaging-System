import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { Credential } from 'src/entity/credential.entity';
import { Issuer } from 'src/entity/Issuer.entity';
import { IssuerKey } from 'src/entity/IssuerKey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credential, Issuer, IssuerKey])],
  controllers: [CredentialController],
  providers: [CredentialService],
})
export class CredentialModule {}