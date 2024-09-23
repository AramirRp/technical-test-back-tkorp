## Description

This is the backend part of the technical test made for TKorp. This is using NestJs as framework, with a MySQL server and all queries are made using GraphQL.  Here's the link to the front repo : [https://github.com/AramirRp/technical-test-back-tkorp](https://github.com/AramirRp/technical-test-front-tkorp).

## Project setup

```bash
$ npm install
```

If you want to use yourself a MySQL server, you'll need to edit the ormconfig.json to your convenience and personnal settings. You'll find a data-SQL.txt file where you'll find every SQL data.


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev 

# production mode
$ npm run start:prod

# default port : localhost:3000 or localhost:3002

```

## Questions

1- Quel animal est le plus vieux ?

Réponse : **ROCKY (né le 2009-09-20)**

```sql
query {
animals(orderBy: DATE_OF_BIRTH_ASC) {
id
name
dateOfBirth
owner {
id
firstName
lastName
}
}
}
```
2 - Quelle espèce est la mieux représentée ? 

Réponse : **Bird (179)**

```sql
query {
mostRepresentedSpecies {
species
count
}
}
```
3 - Quelle personne possède le plus d’animaux ? 

Réponse : **David White (179)**

```sql
query {
personWithMostAnimals {
id
firstName
lastName
animalCount
}
}
```
4 - Quelle personne possède le plus de chats ? 

Réponse : **Sarah White (4)**


```sql
query {
personWithMostCats {
id
firstName
lastName
catCount
}
}
```
5- Qui possède l’animal le plus lourd ? Comment s’appelle cet animal et quel est
son poids ?

Réponse : **Emma Smith avec Chloe (49937)**


```sql
query {
  mostHeavyweightAnimal {
    id
    name
    weight
    owner {
      id
      firstName
      lastName
    }
  }
}
```
6- Qui possède le groupe d’animaux le plus lourd ? Quel est le poids total de ce
groupe d’animaux ? 

Réponse : **Sophie Brown (172152)**


```sql
query {
  heaviestAnimalGroup {
    owner {
      id
      firstName
      lastName
    }
    totalWeight
  }
}
```
