import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;  // El id será autoincrementable

  @Column('json')
  credential: object;  // Campo para almacenar el JSON completo de la credencial
}
