// issuer-key.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Asegúrate de importar TypeOrmModule
import { IssuerKeyService } from './issuer-key.service';
import { IssuerKeyController } from './issuer-key.controller';
import { IssuerKey } from 'src/entity/IssuerKey.entity';  // Importa la entidad IssuerKey

@Module({
  imports: [TypeOrmModule.forFeature([IssuerKey])],  // Registra IssuerKey en el módulo
  controllers: [IssuerKeyController],
  providers: [IssuerKeyService],
})
export class IssuerKeyModule {}
