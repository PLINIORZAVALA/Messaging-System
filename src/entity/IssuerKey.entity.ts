import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Issuer } from './Issuer.entity';
import { Credential } from './credential.entity';

@Entity()
export class IssuerKey {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único autoincremental

  @Column({ type: 'text' }) // Usamos `text` sin índice único
  privateKey: string; // Clave privada del Issuer

  @Column({ type: 'text' })
  publicKey: string; // Clave pública del Issuer

  @OneToOne(() => Issuer, (issuer) => issuer.privateKey) // Relación uno a uno con Issuer
  issuer: Issuer; // Issuer asociado a esta clave

  @OneToMany(() => Credential, (credential) => credential.publicKey)
  credentials: Credential[]; // Lista de credenciales firmadas con esta clave
}