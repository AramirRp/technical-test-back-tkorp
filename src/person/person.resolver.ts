import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person } from '../entities/person.entity';
import { CreatePersonInput, UpdatePersonInput } from './person.input';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person])
  async persons() {
    return this.personService.findAll();
  }

  @Query(() => Person)
  async person(@Args('id', { type: () => Int }) id: number) {
    return this.personService.findOne(id);
  }

  @Mutation(() => Person)
  async createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput,
  ) {
    return this.personService.create(createPersonInput);
  }

  @Mutation(() => Person)
  async updatePerson(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput,
  ) {
    return this.personService.update(id, updatePersonInput);
  }

  @Mutation(() => Boolean)
  async removePerson(@Args('id', { type: () => Int }) id: number) {
    return this.personService.remove(id);
  }
}
