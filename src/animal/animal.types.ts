import { registerEnumType } from '@nestjs/graphql';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

export enum AnimalOrderBy {
    DATE_OF_BIRTH_ASC = 'DATE_OF_BIRTH_ASC',
    DATE_OF_BIRTH_DESC = 'DATE_OF_BIRTH_DESC',
}

registerEnumType(AnimalOrderBy, {
    name: 'AnimalOrderBy',
});

@ObjectType()
class Owner {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@ObjectType()
export class AnimalSpeciesCount {
    @Field()
    species: string;

    @Field(() => Int)
    count: number;
}

@ObjectType()
export class PersonWithMostAnimals {
    @Field(() => Int)
    id: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(() => Int)
    animalCount: number;
}
@ObjectType()
export class PersonWithMostCats {
    @Field(() => Int)
    id: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(() => Int)
    catCount: number;
}

@ObjectType()
export class MostHeavyweightAnimal {
    @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  weight: number;

  @Field(() => Owner)
  owner: Owner;

}

@ObjectType()
export class HeaviestAnimalGroup {
  @Field(() => Owner)
  owner: Owner;

  @Field(() => Float)
  totalWeight: number;
}