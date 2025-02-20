import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { IssuerKeyService } from './issuer-key.service';

@Controller('issuer-key')
export class IssuerKeyController {
  constructor(private readonly issuerKeyService: IssuerKeyService) {}

  // Crear un IssuerKey
  @Post('create/:issuerId')
  async createIssuerKey(@Param('issuerId', ParseIntPipe) issuerId: number) {
    return await this.issuerKeyService.createIssuerKey(issuerId);
  }

  // Obtener la clave privada de un IssuerKey
  @Get(':id/private-key')
  async getPrivateKey(@Param('id', ParseIntPipe) id: number) {
    return await this.issuerKeyService.getPrivateKey(id);
  }

  // Obtener la clave pública de un IssuerKey
  @Get(':id/public-key')
  async getPublicKey(@Param('id', ParseIntPipe) id: number) {
    return await this.issuerKeyService.getPublicKey(id);
  }

  // Obtener el Issuer asociado a un IssuerKey
  @Get(':id/issuer')
  async getIssuer(@Param('id', ParseIntPipe) id: number) {
    return await this.issuerKeyService.getIssuer(id);
  }

  // Obtener el ID de un IssuerKey
  @Get(':id/id')
  async getId(@Param('id', ParseIntPipe) id: number) {
    return await this.issuerKeyService.getId(id);
  }
}