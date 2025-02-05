import { Controller, Post, Body } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDTO } from '../dto/create-credential.dto';
import { Credential } from '../entity/credential.entity';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post('create')
  async createCredential(@Body() credentialData: CreateCredentialDTO): Promise<Credential> {
    return this.credentialService.createCredential(credentialData);
  }
}
