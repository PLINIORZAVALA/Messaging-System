import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialModule } from './credential/credential.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',  // Asegúrate de que el usuario y la contraseña sean correctos
      password: '',      // Si tienes una contraseña, colócala aquí
      database: 'cretdent',  // Asegúrate de que esta base de datos exista
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Evitar en producción, en desarrollo puedes usar true si quieres que la base se sincronice automáticamente
    }),
    CredentialModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
