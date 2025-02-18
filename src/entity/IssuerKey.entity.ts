import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IssuerKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  privateKey: string;

  @Column({ type: 'text' })
  publicKey: string;
}
