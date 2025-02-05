import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { Credential } from 'src/entity/credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  controllers: [CredentialController],
  providers: [CredentialService],
})
export class CredentialModule {}
