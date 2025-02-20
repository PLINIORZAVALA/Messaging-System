import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssuerKey } from 'src/entity/IssuerKey.entity';
import { Issuer } from 'src/entity/Issuer.entity';
import { generateKeyPairSync } from 'crypto';

@Injectable()
export class IssuerKeyService {
  constructor(
    @InjectRepository(IssuerKey)
    private issuerKeyRepository: Repository<IssuerKey>,
    @InjectRepository(Issuer)
    private issuerRepository: Repository<Issuer>,
  ) {}

  // Generar un par de claves (privada y pública)
  generateKeyPair(): { privateKey: string; publicKey: string } {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    return { privateKey, publicKey };
  }

  // Crear un IssuerKey con un par de claves generado
  async createIssuerKey(issuerId: number): Promise<IssuerKey> {
    const issuer = await this.issuerRepository.findOne({
      where: { id: issuerId },
    });
    if (!issuer) {
      throw new NotFoundException(`Issuer with ID ${issuerId} not found`);
    }

    const { privateKey, publicKey } = this.generateKeyPair();

    const issuerKey = new IssuerKey();
    issuerKey.privateKey = privateKey;
    issuerKey.publicKey = publicKey;
    issuerKey.issuer = issuer;

    return await this.issuerKeyRepository.save(issuerKey);
  }

  // Obtener la clave privada de un IssuerKey
  async getPrivateKey(id: number): Promise<string> {
    const issuerKey = await this.issuerKeyRepository.findOne({
      where: { id },
    });
    if (!issuerKey) {
      throw new NotFoundException(`IssuerKey with ID ${id} not found`);
    }
    return issuerKey.privateKey;
  }

  // Obtener la clave pública de un IssuerKey
  async getPublicKey(id: number): Promise<string> {
    const issuerKey = await this.issuerKeyRepository.findOne({
      where: { id },
    });
    if (!issuerKey) {
      throw new NotFoundException(`IssuerKey with ID ${id} not found`);
    }
    return issuerKey.publicKey;
  }

  // Obtener el Issuer asociado a un IssuerKey
  async getIssuer(id: number): Promise<Issuer> {
    const issuerKey = await this.issuerKeyRepository.findOne({
      where: { id },
      relations: ['issuer'],
    });
    if (!issuerKey) {
      throw new NotFoundException(`IssuerKey with ID ${id} not found`);
    }
    return issuerKey.issuer;
  }

  // Obtener el ID de un IssuerKey
  async getId(id: number): Promise<number> {
    const issuerKey = await this.issuerKeyRepository.findOne({
      where: { id },
    });
    if (!issuerKey) {
      throw new NotFoundException(`IssuerKey with ID ${id} not found`);
    }
    return issuerKey.id;
  }
}