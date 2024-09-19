import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity';
@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personRepository.find({ relations: ['animals'] });
  }

  async findOne(id: number): Promise<Person> {
    return this.personRepository.findOne({
      where: { id },
      relations: ['animals'],
    });
  }
  async create(createPersonInput: CreatePersonInput): Promise<Person> {
    const person = this.personRepository.create(createPersonInput);
    return this.personRepository.save(person);
  }

  async update(
    id: number,
    updatePersonInput: UpdatePersonInput,
  ): Promise<Person> {
    await this.personRepository.update(id, updatePersonInput);
    return this.personRepository.findOne({
      where: { id },
      relations: ['animals'],
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.personRepository.delete(id);
    return result.affected > 0;
  }
}
