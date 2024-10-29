/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module'; // Import your Users module
import { ProductsModule } from './products/products.module'; // Import ProductsModule
import { SearchModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // or your database host
      port: 5432, // default postgres port
      username: 'postgres',
      password: 'buttibrahim123',
      database: 'ECOMMERCE',
      autoLoadEntities: true,
      synchronize: true, // use cautiously in production
    }),
    UsersModule,
    ProductsModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
