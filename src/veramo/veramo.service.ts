import { Injectable } from '@nestjs/common';
import { createAgent, IResolver, IDataStore, IKeyManager, ICredentialIssuer } from '@veramo/core';
import { CredentialIssuer } from '@veramo/credential-w3c';
import { DIDManager } from '@veramo/did-manager';
import { KeyManager } from '@veramo/key-manager';
import { KeyManagementSystem } from '@veramo/kms-local';
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { DataStore, DataStoreORM } from '@veramo/data-store';
import { Entities, KeyStore, DIDStore, migrations } from '@veramo/data-store';
import { DataSource } from 'typeorm';

@Injectable()
export class VeramoService {
  public agent;

  constructor() {
    // Configuración de SQLite para almacenar datos
    const dbConnection = new DataSource({
      type: 'sqlite',
      database: './veramo.sqlite', // Base de datos SQLite
      synchronize: true, // Sincroniza automáticamente el esquema
      entities: Entities, // Importa las entidades de Veramo
      migrations: migrations, // Importa las migraciones de Veramo
    });

    // Configuración del agente Veramo
    this.agent = createAgent<IResolver & IDataStore & IKeyManager & ICredentialIssuer>({
      plugins: [
        // Gestión de claves
        new KeyManager({
          store: new KeyStore(dbConnection), // Almacena claves en SQLite
          kms: {
            local: new KeyManagementSystem(new KeyStore(dbConnection)), // Usa el sistema de gestión de claves local
          },
        }),
        // Gestión de DIDs
        new DIDManager({
          store: new DIDStore(dbConnection), // Almacena DIDs en SQLite
          defaultProvider: 'did:ethr:rinkeby', // Proveedor de DIDs por defecto
          providers: {
            'did:ethr:rinkeby': require('@veramo/did-provider-ethr').EthrDIDProvider({
              defaultKms: 'local', // Usa el KMS local
              network: 'rinkeby', // Red Ethereum Rinkeby
            }),
          },
        }),
        // Resolución de DIDs
        new DIDResolverPlugin({
          resolver: new Resolver({
            ...getResolver({ networks: [{ name: 'rinkeby', rpcUrl: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID' }] }),
          }),
        }),
        // Emisión de credenciales verificables
        new CredentialIssuer(),
        // Almacenamiento de datos
        new DataStore(dbConnection),
        new DataStoreORM(dbConnection),
      ],
    });
  }
}