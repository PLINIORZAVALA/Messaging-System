import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDTO } from 'src/dto/create-credential.dto';

@Controller('credential')
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  // Obtener todas las credenciales
  @Get()
  async getAllCredentials() {
    return await this.credentialService.getAllCredentials();
  }

  // Obtener una credencial por ID
  @Get(':id')
  async getCredentialById(@Param('id', ParseIntPipe) id: number) {
    return await this.credentialService.getCredentialById(id);
  }

  // Crear una credencial
  @Post('create')
  async createCredential(
    @Body() credentialData: CreateCredentialDTO,
    @Body('issuerId', ParseIntPipe) issuerId: number,
    @Body('publicKeyId', ParseIntPipe) publicKeyId: number,
  ) {
    return await this.credentialService.createCredential(
      credentialData,
      issuerId,
      publicKeyId,
    );
  }

  // Obtener el Issuer de una credencial
  @Get(':id/issuer')
  async getIssuer(@Param('id', ParseIntPipe) id: number) {
    return await this.credentialService.getIssuer(id);
  }

  // Obtener la clave pública de una credencial
  @Get(':id/public-key')
  async getPublicKey(@Param('id', ParseIntPipe) id: number) {
    return await this.credentialService.getPublicKey(id);
  }
}