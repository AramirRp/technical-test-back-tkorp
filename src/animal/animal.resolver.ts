import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnimalService } from './animal.service';
import { Animal } from '../entities/animal.entity';
import { CreateAnimalInput, UpdateAnimalInput } from './animal.input';

@Resolver(() => Animal)
export class AnimalResolver {
  constructor(private animalService: AnimalService) {}

  @Query(() => [Animal])
  async animals() {
    return this.animalService.findAll();
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
