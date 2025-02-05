import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;  // Identificador único para la entidad

  @Column('json')
  credential: object;  // Campo para almacenar el JSON completo de la credencial
}
