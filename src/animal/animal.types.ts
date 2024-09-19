import { registerEnumType } from '@nestjs/graphql';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export enum AnimalOrderBy {
  DATE_OF_BIRTH_ASC = 'DATE_OF_BIRTH_ASC',
  DATE_OF_BIRTH_DESC = 'DATE_OF_BIRTH_DESC',
}

registerEnumType(AnimalOrderBy, {
  name: 'AnimalOrderBy',
});

@ObjectType()
export class AnimalSpeciesCount {
  @Field()
  species: string;

  @Field(() => Int)
  count: number;
}