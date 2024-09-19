import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../entities/animal.entity';
import { CreateAnimalInput, UpdateAnimalInput } from './animal.input';
import { AnimalOrderBy } from './animal.types';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async findAll(orderBy?: AnimalOrderBy): Promise<Animal[]> {
    const query = this.animalRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.owner', 'owner');

    if (orderBy === AnimalOrderBy.DATE_OF_BIRTH_ASC) {
      query.orderBy('animal.dateOfBirth', 'ASC');
    } else if (orderBy === AnimalOrderBy.DATE_OF_BIRTH_DESC) {
      query.orderBy('animal.dateOfBirth', 'DESC');
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Animal> {
    return this.animalRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  async create(createAnimalInput: CreateAnimalInput): Promise<Animal> {
    const animal = this.animalRepository.create(createAnimalInput);
    return this.animalRepository.save(animal);
  }

  async update(
    id: number,
    updateAnimalInput: UpdateAnimalInput,
  ): Promise<Animal> {
    await this.animalRepository.update(id, updateAnimalInput);
    return this.animalRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.animalRepository.delete(id);
    return result.affected > 0;
  }
}
