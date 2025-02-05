import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from '../entity/credential.entity';
import { CreateCredentialDTO } from '../dto/create-credential.dto';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}

  // Crear y guardar la credencial en la base de datos
  async createCredential(credentialData: CreateCredentialDTO): Promise<Credential> {
    const credential = new Credential();
    credential.credential = credentialData;  // Asignar el JSON a la entidad

    return this.credentialRepository.save(credential);  // Guardar la entidad en la base de datos
  }
}
