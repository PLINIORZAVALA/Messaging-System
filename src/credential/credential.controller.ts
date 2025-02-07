import { Controller, Post, Body, Get } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDTO } from '../dto/create-credential.dto';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post('create')
  async createCredential(@Body() credentialData: CreateCredentialDTO): Promise<any> {
    return this.credentialService.createCredential(credentialData);
  }

  @Get('test')
  testEndpoint() {
    return { message: 'El controlador está funcionando' };
  }
}