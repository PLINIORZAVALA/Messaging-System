import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssuerKey } from 'src/entity/IssuerKey.entity';
import { Credential } from 'src/entity/credential.entity';
import { Issuer } from 'src/entity/Issuer.entity';

@Injectable()
export class IssuerService {
  constructor(
    @InjectRepository(Issuer)
    private issuerRepository: Repository<Issuer>,
    @InjectRepository(IssuerKey)
    private issuerKeyRepository: Repository<IssuerKey>,
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}

  // Crear un Issuer
  async createIssuer(name: string): Promise<Issuer> {
    const issuer = new Issuer();
    issuer.name = name;

    // Crear una clave privada asociada al Issuer
    const issuerKey = new IssuerKey();
    issuerKey.privateKey = 'clave_privada_generada'; // Aquí deberías generar una clave privada segura
    issuerKey.publicKey = 'clave_pública_generada'; // Aquí deberías generar una clave pública segura

    // Guardar la clave privada
    await this.issuerKeyRepository.save(issuerKey);

    // Asignar la clave privada al Issuer
    issuer.privateKey = issuerKey;

    // Guardar el Issuer en la base de datos
    return await this.issuerRepository.save(issuer);
  }

  // Agregar una credencial al Issuer
  async addCredential(issuerId: number, credentialId: number): Promise<void> {
    const issuer = await this.issuerRepository.findOne({
      where: { id: issuerId },
      relations: ['credentials'],
    });
    if (!issuer) {
      throw new NotFoundException(`Issuer with ID ${issuerId} not found`);
    }

    const credential = await this.credentialRepository.findOne({
      where: { id: credentialId },
    });
    if (!credential) {
      throw new NotFoundException(`Credential with ID ${credentialId} not found`);
    }

    // Agregar la credencial al Issuer
    issuer.credentials.push(credential);
    await this.issuerRepository.save(issuer);
  }

  // Obtener la clave privada del Issuer
  async getPrivateKey(issuerId: number): Promise<IssuerKey> {
    const issuer = await this.issuerRepository.findOne({
      where: { id: issuerId },
      relations: ['privateKey'],
    });
    if (!issuer) {
      throw new NotFoundException(`Issuer with ID ${issuerId} not found`);
    }
    return issuer.privateKey;
  }

  // Obtener el ID del Issuer
  async getId(issuerId: number): Promise<number> {
    const issuer = await this.issuerRepository.findOne({
      where: { id: issuerId },
    });
    if (!issuer) {
      throw new NotFoundException(`Issuer with ID ${issuerId} not found`);
    }
    return issuer.id;
  }

  // Obtener el nombre del Issuer
  async getName(issuerId: number): Promise<string> {
    const issuer = await this.issuerRepository.findOne({
      where: { id: issuerId },
    });
    if (!issuer) {
      throw new NotFoundException(`Issuer with ID ${issuerId} not found`);
    }
    return issuer.name;
  }
}