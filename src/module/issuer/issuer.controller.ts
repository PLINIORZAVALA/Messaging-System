import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { IssuerService } from './issuer.service';

@Controller('issuer')
export class IssuerController {
  constructor(private readonly issuerService: IssuerService) {}

  // Crear un Issuer
  @Post('create')
  async createIssuer(@Body('name') name: string) {
    return await this.issuerService.createIssuer(name);
  }

  // Agregar una credencial al Issuer
  @Post(':issuerId/add-credential/:credentialId')
  async addCredential(
    @Param('issuerId', ParseIntPipe) issuerId: number,
    @Param('credentialId', ParseIntPipe) credentialId: number,
  ) {
    return await this.issuerService.addCredential(issuerId, credentialId);
  }

  // Obtener la clave privada del Issuer
  @Get(':id/private-key')
  async getPrivateKey(@Param('id', ParseIntPipe) id: number) {
    return await this.issuerService.getPrivateKey(id);
  }

  // Obtener el ID del Issuer
  @Get(':id/id')
  async getId(@Param('id', ParseIntPipe) id: number) {
    return await this.issuerService.getId(id);
  }

  // Obtener el nombre del Issuer
  @Get(':id/name')
  async getName(@Param('id', ParseIntPipe) id: number) {
    return await this.issuerService.getName(id);
  }
}