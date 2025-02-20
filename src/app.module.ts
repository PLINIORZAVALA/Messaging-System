import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialModule } from './module/credential/credential.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuerKeyModule } from './module/issuer-key/issuer-key.module';
import { IssuerModule } from './module/issuer/issuer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',  // Asegúrate de que el usuario y la contraseña sean correctos
      password: '',      // Si tienes una contraseña, colócala aquí
      database: 'credentialvc',  // Asegúrate de que esta base de datos exista
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Evitar en producción, en desarrollo puedes usar true si quieres que la base se sincronice automáticamente
    }),
    CredentialModule,
    IssuerKeyModule,
    IssuerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
