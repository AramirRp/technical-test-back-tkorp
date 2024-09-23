import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Person } from './entities/person.entity';
import { Animal } from './entities/animal.entity';
import { AppResolver } from './app.resolver';
import { AnimalOwnerModule } from './animalOwnerModule';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    AnimalOwnerModule,
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule {}
