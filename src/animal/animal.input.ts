import { InputType, Field, Int, Float } from '@nestjs/graphql';
@InputType()
export class CreateAnimalInput {
  @Field()
  name: string;

  @Field()
  dateOfBirth: Date;

  @Field()
  species: string;

  @Field()
  breed: string;

  @Field()
  color: string;

  @Field(() => Float)
  weight: number;

  @Field(() => Int)
  ownerId: number;
}

@InputType()
export class UpdateAnimalInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  species?: string;

  @Field({ nullable: true })
  breed?: string;

  @Field({ nullable: true })
  color?: string;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field(() => Int, { nullable: true })
  ownerId?: number;
}