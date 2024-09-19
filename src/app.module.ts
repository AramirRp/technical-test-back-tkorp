import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Person } from './entities/person.entity';
import { Animal } from './entities/animal.entity';
import { PersonModule } from './person/person.module';
import { AnimalModule } from './animal/animal.module';
import { AppResolver } from './app.resolver';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql' as 'mysql',
  database: 'animal_owner_db',
  host: '127.0.0.1',
  port: 3308,
  username: 'root',
  password: '',
  logging: true,
  entities: [Animal, Person],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    PersonModule,
    AnimalModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})

export class AppModule {}