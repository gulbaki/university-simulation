
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

## Ec2  Address

http://ec2-54-175-173-6.compute-1.amazonaws.com/
  
## AWS Api Gateway   Addres
ANY /students → ANY https://vjyvtcll2l.execute-api.us-east-1.amazonaws.com/v1 => students (HTTP)


ANY /universities → ANY https://vjyvtcll2l.execute-api.us-east-1.amazonaws.com/v1 => universities (HTTP)

ANY /exam/start-exam → ANY https://vjyvtcll2l.execute-api.us-east-1.amazonaws.com/v1 => exam/start-exam (HTTP)


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

GET `/universities/:id/students` 

This endpoint returns students with registered university

POST `/universities` 

This endpoint allows you to create a new student. The request body should be a JSON object with the following properties:

````
{
  "name": "Fırat University"
}
````

DELETE `/universities` 

This endpoint delete  of all universities.

DELETE `/universities/:id` 

This endpoint returns a list of all universities.

GET `/exam/start-exam` 

````
query = "2020/03/03" type date
````
This endpoint start exam.


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

