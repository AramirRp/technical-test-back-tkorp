import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../entities/animal.entity';
import { CreateAnimalInput, UpdateAnimalInput } from './animal.input';
import {
  AnimalOrderBy,
  AnimalSpeciesCount,
  PersonWithMostAnimals,
  PersonWithMostCats,
  MostHeavyweightAnimal,
  HeaviestAnimalGroup,
} from './animal.types';

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

  async mostRepresentedSpecies(): Promise<AnimalSpeciesCount> {
    const speciesCounts = await this.animalRepository
      .createQueryBuilder('animal')
      .select('animal.species', 'species')
      .addSelect('COUNT(animal.id)', 'count')
      .groupBy('animal.species')
      .orderBy('count', 'DESC')
      .getRawMany();

    if (speciesCounts.length === 0) {
      throw new NotFoundException('No animals found');
    }

    return {
      species: speciesCounts[0].species,
      count: parseInt(speciesCounts[0].count, 10),
    };
  }

  async findPersonWithMostAnimals(): Promise<PersonWithMostAnimals> {
    const result = await this.animalRepository
      .createQueryBuilder('animal')
      .select('animal.owner.id', 'id')
      .addSelect('owner.firstName', 'firstName')
      .addSelect('owner.lastName', 'lastName')
      .addSelect('COUNT(animal.id)', 'animalCount')
      .leftJoin('animal.owner', 'owner')
      .groupBy('animal.species')
      .orderBy('animalCount', 'DESC')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new NotFoundException('No person with animal found');
    }

    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      animalCount: parseInt(result.animalCount, 10),
    };
  }

  async findPersonWithMostCats(): Promise<PersonWithMostCats> {
    const result = await this.animalRepository
      .createQueryBuilder('animal')
      .select('owner.id', 'id')
      .addSelect('owner.firstName', 'firstName')
      .addSelect('owner.lastName', 'lastName')
      .addSelect('COUNT(animal.id)', 'catCount')
      .leftJoin('animal.owner', 'owner')
      .where('animal.species = :species', { species: 'cat' })
      .groupBy('owner.id')
      .orderBy('catCount', 'DESC')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new NotFoundException('No person with cats found');
    }

    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      catCount: parseInt(result.catCount, 10),
    };
  }

  async findMostHeavyweightAnimal(): Promise<MostHeavyweightAnimal> {
    const result = await this.animalRepository
      .createQueryBuilder('animal')
      .select('animal.id', 'id')
      .addSelect('animal.name', 'name')
      .addSelect('animal.weight', 'weight')
      .addSelect('owner.id', 'ownerId')
      .addSelect('owner.firstName', 'ownerFirstName')
      .addSelect('owner.lastName', 'ownerLastName')
      .leftJoin('animal.owner', 'owner')
      .orderBy('animal.weight', 'DESC')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new NotFoundException('No animals found');
    }

    return {
      id: result.id,
      name: result.name,
      weight: result.weight,
      owner: {
        id: result.ownerId,
        firstName: result.ownerFirstName,
        lastName: result.ownerLastName,
      },
    };
  }

  async findHeaviestAnimalGroup(): Promise<HeaviestAnimalGroup> {
    const result = await this.animalRepository
      .createQueryBuilder('animal')
      .select('owner.id', 'ownerId')
      .addSelect('owner.firstName', 'ownerFirstName')
      .addSelect('owner.lastName', 'ownerLastName')
      .addSelect('SUM(animal.weight)', 'totalWeight')
      .leftJoin('animal.owner', 'owner')
      .groupBy('owner.id')
      .orderBy('totalWeight', 'DESC')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new NotFoundException('No animals found');
    }

    return {
      owner: {
        id: result.ownerId,
        firstName: result.ownerFirstName,
        lastName: result.ownerLastName,
      },
      totalWeight: parseFloat(result.totalWeight),
    };
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
