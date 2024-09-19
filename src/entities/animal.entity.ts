import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Person } from './person.entity';
@ObjectType()
@Entity()
export class Animal {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  dateOfBirth: Date;

  @Field()
  @Column()
  species: string;

  @Field()
  @Column()
  breed: string;

  @Field()
  @Column()
  color: string;

  @Field(() => Float)
  @Column('float')
  weight: number;

  @Field(() => Person)
  @ManyToOne(() => Person, (person) => person.animals)
  owner: Person;
}

