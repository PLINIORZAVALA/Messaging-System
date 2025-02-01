import { Controller, Post, Body } from '@nestjs/common';
import { VeramoService } from '../veramo/veramo.service';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly veramoService: VeramoService) {}

  // Endpoint para emitir una credencial verificable
  @Post('issue')
  async issueCredential(@Body() body: any) {
    const { credentialSubject } = body;

    try {
      // Crear un DID para el emisor
      const issuer = await this.veramoService.agent.didManagerCreate({
        provider: 'did:ethr:rinkeby',
        kms: 'local',
      });

      // Crear una credencial verificable
      const credential = await this.veramoService.agent.createVerifiableCredential({
        credential: {
          "@context": ["https://www.w3.org/2018/credentials/v1"], // Contexto JSON-LD
          type: ["VerifiableCredential", "UniversityDegreeCredential"], // Tipos de credencial
          issuer: issuer.did, // DID del emisor
          issuanceDate: new Date().toISOString(), // Fecha de emisión
          credentialSubject, // Datos del sujeto de la credencial
        },
        proofFormat: 'jwt', // Formato de la firma (JWT)
      });

      // Devolver la credencial emitida
      return { credential };
    } catch (error) {
      // Manejar errores
      throw new Error(`Error al emitir la credencial: ${error.message}`);
    }
  }

  // Endpoint para verificar una credencial verificable
  @Post('verify')
  async verifyCredential(@Body() body: any) {
    const { credential } = body;

    try {
      // Verificar la credencial
      const result = await this.veramoService.agent.verifyCredential({
        credential,
      });

      // Devolver el resultado de la verificación
      return { verified: result.verified };
    } catch (error) {
      // Manejar errores
      throw new Error(`Error al verificar la credencial: ${error.message}`);
    }
  }
}