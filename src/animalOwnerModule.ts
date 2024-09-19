import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalService } from './animal/animal.service';
import { PersonService } from './person/person.service';
import { AnimalResolver } from './animal/animal.resolver';
import { PersonResolver } from './person/person.resolver';
import { Animal } from './entities/animal.entity';
import { Person } from './entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Person])],
  providers: [AnimalService, PersonService, AnimalResolver, PersonResolver],
})
export class AnimalOwnerModule {}