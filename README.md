
# University Similation Project with Nestjs

This is a university similation NestJS project that demonstrates how to create a REST API.

## Installation

To install this project, first clone the repository:

```
git clone https://github.com/gulbaki/university-simulation.git
```

Then, navigate to the project directory and install the dependencies:

```
cd university-simulation
npm install
```

## Usage

To run the project, use the following command:


```
npm run start
```
This will start the server on port 3006. You can then access the API by sending HTTP requests to http://localhost:3006.
## AWS Api Gateway and ec2  Address

ANY /students → ANY http://ec2-54-173-188-203.compute-1.amazonaws.com/ => students (HTTP)


ANY /universities → ANY http://ec2-54-173-188-203.compute-1.amazonaws.com/ => universities (HTTP)

ANY /exam/start-exam → ANY http://ec2-54-173-188-203.compute-1.amazonaws.com/ => exam/start-exam (HTTP)


## API Endpoints
GET `/students`

This endpoint returns a list of all users.

GET `/students/:id` 

This endpoint returns a list of one user.

POST `/students` 

This endpoint allows you to create a new student. The request body should be a JSON object with the following properties:

````
{
  "name": "John ",
  "surname": "Doe"
  "email": "john@example.com"
}
````

DELETE `/students` 

This endpoint delete  of all users.

DELETE `/students/:id` 

This endpoint returns a list of all users.


GET `/universities`

This endpoint returns a list of all universities.

GET `/universities/:id` 

This endpoint returns a list of one university.

POST `/universities` 

This endpoint allows you to create a new student. The request body should be a JSON object with the following properties:

````
{
  "name": "Adana"
}
````

DELETE `/universities` 

This endpoint delete  of all universities.

DELETE `/universities/:id` 

This endpoint returns a list of all universities.


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
start-exam 'a bir response ekle 
date i default olarak girdirmeyi sağla

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



## ec2 http://ec2-54-173-188-203.compute-1.amazonaws.com/api/v1/docs
## Description

API name
api ollang
Integrations
ANY http://ec2-54-173-188-203.compute-1.amazonaws.com/students (HTTP)
ANY http://ec2-54-173-188-203.compute-1.amazonaws.com/universities (HTTP)
ANY http://ec2-54-173-188-203.compute-1.amazonaws.com/exam/start-exam (HTTP)
##
Routes
ANY /students → ANY http://ec2-54-173-188-203.compute-1.amazonaws.com/students (HTTP)
ANY /universities → ANY http://ec2-54-173-188-203.compute-1.amazonaws.com/universities (HTTP)
ANY /exam/start-exam → ANY http://ec2-54-173-188-203.compute-1.amazonaws.com/exam/start-exam (HTTP)
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
