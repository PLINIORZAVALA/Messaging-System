import { Controller } from '@nestjs/common';
import { IssuerKeyService } from './issuer-key.service';

@Controller('issuer-key')
export class IssuerKeyController {
  constructor(private readonly issuerKeyService: IssuerKeyService) {}
}
