import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from 'src/entity/credential.entity';
import { Issuer } from 'src/entity/Issuer.entity';
import { IssuerKey } from 'src/entity/IssuerKey.entity';
import { CreateCredentialDTO } from 'src/dto/create-credential.dto';
import { sign } from 'crypto';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
    @InjectRepository(Issuer)
    private issuerRepository: Repository<Issuer>,
    @InjectRepository(IssuerKey)
    private issuerKeyRepository: Repository<IssuerKey>,
  ) {}

  // Obtener todas las credenciales
  async getAllCredentials(): Promise<Credential[]> {
    return await this.credentialRepository.find({
      relations: ['issuer', 'publicKey'],
    });
  }

  // Obtener una credencial por ID
  async getCredentialById(id: number): Promise<Credential> {
    const credential = await this.credentialRepository.findOne({
      where: { id },
      relations: ['issuer', 'publicKey'],
    });
    if (!credential) {
      throw new NotFoundException(`Credential with ID ${id} not found`);
    }
    return credential;
  }

  // Crear una credencial firmada
  async createCredential(
    credentialData: CreateCredentialDTO,
    issuerId: number,
    publicKeyId: number,
  ) {
    // Buscar el Issuer
    const issuer = await this.issuerRepository.findOne({
      where: { id: issuerId },
      relations: ['privateKey'],
    });
    if (!issuer) {
      throw new NotFoundException(`Issuer with ID ${issuerId} not found`);
    }

    // Buscar la clave pública
    const publicKey = await this.issuerKeyRepository.findOne({
      where: { id: publicKeyId },
    });
    if (!publicKey) {
      throw new NotFoundException(`PublicKey with ID ${publicKeyId} not found`);
    }

    // Generar el DID del Issuer
    const issuerDid = this.generateDid(issuer.id);

    // Crear el objeto de la credencial
    const credential = {
      "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://www.w3.org/ns/credentials/examples/v2",
      ],
      "id": `http://university.example/credentials/${Math.floor(Math.random() * 10000)}`,
      "type": ["VerifiableCredential", "ExampleDegreeCredential"],
      "issuer": issuerDid,
      "ValidFrom": new Date().toISOString(),
      "credentialSubject": {
        ...credentialData.credentialSubject,
      },
    };

    // Firmar la credencial con la clave privada del Issuer
    const signature = this.signWithEd25519(
      issuer.privateKey.privateKey,
      JSON.stringify(credential),
    );

    // Crear la credencial firmada
    const signedCredential = {
      ...credential,
      proof: {
        type: "DataIntegrityProof",
        cryptosuite: 'Ed25519Signature2018',
        created: new Date().toISOString(),
        verificationMethod: `${issuerDid}#key-1`,
        proofPurpose: "assertionMethod",
        proofValue: signature.toString('base64'),
      },
    };

    // Guardar la credencial en la base de datos
    const credentialEntity = new Credential();
    credentialEntity.credential = signedCredential;
    credentialEntity.issuer = issuer;
    credentialEntity.publicKey = publicKey;

    await this.credentialRepository.save(credentialEntity);

    return {
      id: credentialEntity.id,
      credential: signedCredential,
      issuer: {
        id: issuer.id,
        name: issuer.name,
        did: issuerDid,
      },
      publicKey: {
        id: publicKey.id,
        publicKey: publicKey.publicKey,
      },
    };
  }

  // Función para generar un DID
  private generateDid(issuerId: number): string {
    return `did:ion:${issuerId}`;
  }

  // Función para firmar con Ed25519
  private signWithEd25519(privateKey: string, data: string): Buffer {
    const signObject = sign(null, Buffer.from(data), privateKey);
    return signObject;
  }

  // Obtener el Issuer de una credencial
  async getIssuer(id: number): Promise<Issuer> {
    const credential = await this.credentialRepository.findOne({
      where: { id },
      relations: ['issuer'],
    });
    if (!credential) {
      throw new NotFoundException(`Credential with ID ${id} not found`);
    }
    return credential.issuer;
  }

  // Obtener la clave pública de una credencial
  async getPublicKey(id: number): Promise<IssuerKey> {
    const credential = await this.credentialRepository.findOne({
      where: { id },
      relations: ['publicKey'],
    });
    if (!credential) {
      throw new NotFoundException(`Credential with ID ${id} not found`);
    }
    return credential.publicKey;
  }
}
