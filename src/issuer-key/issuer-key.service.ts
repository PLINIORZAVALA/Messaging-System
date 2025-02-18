// issuer-key.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssuerKey } from 'src/entity/IssuerKey.entity';

@Injectable()
export class IssuerKeyService {
  constructor(
    @InjectRepository(IssuerKey)
    private keyRepository: Repository<IssuerKey>,  // Inyecta el repositorio
  ) {}

  async getIssuerKey(): Promise<IssuerKey> {
    let key = await this.keyRepository.findOne({ where: { id: 1 } });

    if (!key) {
      throw new Error('Clave del emisor no encontrada en la base de datos.');
    }

    return key;
  }
}
