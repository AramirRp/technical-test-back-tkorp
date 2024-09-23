import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';

@Module({
  providers: [PersonService],
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [],
})
export class PersonModule {}
