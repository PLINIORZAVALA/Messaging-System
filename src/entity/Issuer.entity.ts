import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IssuerKey } from './IssuerKey.entity';
import { Credential } from './credential.entity';

@Entity()
export class Issuer {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único autoincremental

  @Column({ type: 'text', nullable: true })
  name: string; // Nombre del Issuer (opcional)

  @OneToOne(() => IssuerKey, { cascade: true }) // Relación uno a uno con IssuerKey
  @JoinColumn({ name: 'privateKeyId' })
  privateKey: IssuerKey; // Clave privada asociada al Issuer

  @OneToMany(() => Credential, (credential) => credential.issuer)
  credentials: Credential[]; // Lista de credenciales emitidas por el Issuer
}