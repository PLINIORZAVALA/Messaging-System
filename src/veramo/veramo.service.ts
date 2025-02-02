import { Injectable, OnModuleInit } from '@nestjs/common';
import { createAgent, IResolver, IDataStore, IKeyManager, ICredentialIssuer } from '@veramo/core';
import { CredentialIssuer } from '@veramo/credential-w3c';
import { DIDManager } from '@veramo/did-manager';
import { KeyManager } from '@veramo/key-manager';
import { KeyManagementSystem } from '@veramo/kms-local';
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { DataStore, DataStoreORM, PrivateKeyStore, KeyStore, DIDStore, Entities, migrations } from '@veramo/data-store';
import { DataSource } from 'typeorm';

@Injectable()
export class VeramoService implements OnModuleInit {
  public agent;
  private dbConnection: DataSource;

  async onModuleInit() {
    this.dbConnection = new DataSource({
      type: 'sqlite',
      database: './veramo.sqlite',
      synchronize: true,
      entities: Entities,
      migrations: migrations,
    });
    await this.dbConnection.initialize();

    this.agent = createAgent<IResolver & IDataStore & IKeyManager & ICredentialIssuer>({
      plugins: [
        new KeyManager({
          store: new KeyStore(this.dbConnection), // Cambio aquí
          kms: {
            local: new KeyManagementSystem(new PrivateKeyStore(this.dbConnection)), // Cambio aquí
          },
        }),
        new DIDManager({
          store: new DIDStore(this.dbConnection),
          defaultProvider: 'did:ethr:rinkeby',
          providers: {
            'did:ethr:rinkeby': new (require('@veramo/did-provider-ethr').EthrDIDProvider)({
              defaultKms: 'local',
              network: 'rinkeby',
            }),
          },
        }),
        new DIDResolverPlugin({
          resolver: new Resolver({
            ...getResolver({ networks: [{ name: 'rinkeby', rpcUrl: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID' }] }),
          }),
        }),
        new CredentialIssuer(),
        new DataStore(this.dbConnection),
        new DataStoreORM(this.dbConnection),
      ],
    });
  }
}
