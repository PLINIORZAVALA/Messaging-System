import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDTO } from '../dto/create-credential.dto';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Get()
  async getAllCredentials() {
    return await this.credentialService.getAllCredentials();
  }

  @Get(':id')
  async getCredentialById(@Param('id', ParseIntPipe) id: number) {
    return await this.credentialService.getCredentialById(id);
  }

  @Post('create')
  async createCredential(@Body() credentialData: CreateCredentialDTO): Promise<any> {
    return this.credentialService.createCredential(credentialData);
  }

  @Get('test')
  testEndpoint() {
    return { message: 'El controlador está funcionando' };
  }
}
