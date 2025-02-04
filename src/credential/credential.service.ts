import { Injectable } from '@nestjs/common';
import { agent } from 'src/veramo/setup';

@Injectable()
export class CredentialService {
  async createCredential() {
    try {
      const identifier = await agent.didManagerGetByAlias({ alias: 'default' });

      const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
          issuer: { id: identifier.did },
          credentialSubject: {
            id: 'did:web:example.com',
            you: 'Rock',
          },
        },
        proofFormat: 'jwt',
      });

      console.log('New credential created');
      console.log(JSON.stringify(verifiableCredential, null, 2));

      return verifiableCredential;
    } catch (error) {
      console.error('Error creating credential:', error);
    }
  }
}
