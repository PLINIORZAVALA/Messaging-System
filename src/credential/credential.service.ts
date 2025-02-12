import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from '../entity/credential.entity';
import { CreateCredentialDTO } from '../dto/create-credential.dto';
import { generateKeyPairSync, sign } from 'crypto'; // Usamos la librería 'crypto' para crear la firma

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}

  // Crear, firmar y guardar la credencial en la base de datos
  async createCredential(credentialData: CreateCredentialDTO): Promise<Credential> {
    const credential = {
      "@context": "https://www.w3.org/ns/credentials/v2",
      "type": "VerifiableCredential",
      "credentialSubject": {
        ...credentialData,  // Usa los datos de la credencial
      },
    };

    // Genera una clave privada y pública de Ed25519 (solo para demostración, usa tu propia clave en producción)
    const { privateKey, publicKey } = generateKeyPairSync('ed25519', {
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      publicKeyEncoding: { type: 'spki', format: 'pem' },
    });// -> Se busca que el issuer ya tenga la clave 

    // Firma la credencial con la clave privada
    const signature = this.signWithEd25519(privateKey, JSON.stringify(credential));

    // Añadimos la firma al objeto de la credencial
    const signedCredential = {
      credential: credential,  // Asignamos el objeto de la credencial original
      proof: {
        type: 'Ed25519Signature2018',
        created: new Date().toISOString(),
        creator: 'did:example:1234567890', // Agrega el DID correspondiente
        signatureValue: signature.toString('base64'),
      },
    };

    // Crear la entidad Credential para guardar en la base de datos
    const credentialEntity = new Credential();
    credentialEntity.credential = signedCredential;  // Asignamos la credencial firmada

    // Guardar la credencial firmada en la base de datos
    await this.credentialRepository.save(credentialEntity);

    // Retornar la entidad almacenada (incluye el ID autogenerado)
    return credentialEntity; 
  }

  // Función para firmar los datos con Ed25519
  private signWithEd25519(privateKey: string, data: string): Buffer {
    // Creamos el objeto que representa la firma
    const signObject = sign(null, Buffer.from(data), privateKey);
    return signObject; // Retornamos la firma
  }
}
