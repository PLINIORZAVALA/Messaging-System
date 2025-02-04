import { Controller, Get } from '@nestjs/common';
import { CredentialService } from './credential.service';

@Controller('credentials')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Get('create')
  async createCredential() {
    return this.credentialService.createCredential();
  }
}
