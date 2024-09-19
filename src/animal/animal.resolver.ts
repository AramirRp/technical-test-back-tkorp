import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnimalService } from './animal.service';
import { Animal } from '../entities/animal.entity';
import { CreateAnimalInput, UpdateAnimalInput } from './animal.input';
import { AnimalOrderBy, AnimalSpeciesCount, PersonWithMostAnimals, PersonWithMostCats } from './animal.types';

@Resolver(() => Animal)
export class AnimalResolver {
  constructor(private animalService: AnimalService) { }

  @Query(() => [Animal])
  async animals(
    @Args('orderBy', { type: () => AnimalOrderBy, nullable: true })
    orderBy?: AnimalOrderBy,
  ) {
    return this.animalService.findAll(orderBy);
  }

  @Query(() => AnimalSpeciesCount)
  async mostRepresentedSpecies() {
    return this.animalService.mostRepresentedSpecies();
  }

  @Query(() => PersonWithMostAnimals)
  async personWithMostAnimals() {
    return this.animalService.findPersonWithMostAnimals();
  }

  @Query(() => PersonWithMostCats)
  async personWithMostCats() {
    return this.animalService.findPersonWithMostCats();
  }


  @Query(() => Animal)
  async animal(@Args('id', { type: () => Int }) id: number) {
    return this.animalService.findOne(id);
  }

  @Mutation(() => Animal)
  async createAnimal(
    @Args('createAnimalInput') createAnimalInput: CreateAnimalInput,
  ) {
    return this.animalService.create(createAnimalInput);
  }

  @Mutation(() => Animal)
  async updateAnimal(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput,
  ) {
    return this.animalService.update(id, updateAnimalInput);
  }

  @Mutation(() => Boolean)
  async removeAnimal(@Args('id', { type: () => Int }) id: number) {
    return this.animalService.remove(id);
  }
}
