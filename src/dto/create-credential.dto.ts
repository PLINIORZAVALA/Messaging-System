import { IsString, IsObject, IsDateString } from 'class-validator';

export class CreateCredentialDTO {
  @IsString()
  id: string;

  @IsString()
  type: string;

  @IsString()
  issuer: string;

  @IsObject()
  credentialSubject: object;

  @IsDateString()
  issuanceDate: string;

  @IsObject()
  proof: object;
}
