import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Issuer } from './Issuer.entity';
import { IssuerKey } from './IssuerKey.entity';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único autoincremental

  @Column('json')
  credential: object; // JSON completo de la credencial

  @ManyToOne(() => Issuer, (issuer) => issuer.credentials) // Relación muchos a uno con Issuer
  @JoinColumn({ name: 'issuerId' })
  issuer: Issuer; // Issuer que emitió la credencial

  @ManyToOne(() => IssuerKey) // Relación muchos a uno con IssuerKey
  @JoinColumn({ name: 'publicKeyId' })
  publicKey: IssuerKey; // Clave pública usada para firmar la credencial
}