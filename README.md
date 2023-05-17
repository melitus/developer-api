# Developer API coding task

## Design and implementation of Developer Api interface

# Coding Case

The following is about designing and implementing an interface with the following main functions:

- Create, edit, view and delete developer entities via an interface.
- The dataset should also be persisted.
- The implementation includes different focal points from different areas, which in combination result in an application.

## These are your specifications:

Default Technologies:

- Typescript

- Node.js

- Express.js or Nest.js

- Docker and Docker Compose

- Any database (e.g. Redis, SQL, MongoDB ...).

The rest is up to you.

### Default data models:
- Developer model: id, name, email, level (senior or junior).



### The implementation is divided into several sub-areas / focal points:

1. implementation of the interface

- Return of all developers

- Filtering by level

- Return of a specific developer

- Creation of a developer with the developer model defined above

- Editing a developer

- Deleting a developer



2. configuration of environments

 A configuration is to be used to distinguish between the environments

The following environments are predefined:
- Development
- Production



3. persistence of the data

The data should be stored differently for each environment

- For Development:        In-Memory Persistence
                                        This is to be implemented itself

- For Production:            Any database 

4. orchestration

- The application is to be implemented as a Docker container

- The application and the Redis database should be integrated into docker-compose.




# Tools

- NodeJS
- Express
- Typescript
- Mongodb
- Mongoose
- Docker
- Docker compose

 ## Set Up

The easiest way to get started is to clone the repository:

# clone the repository

```
git clone https://github.com/melitus/eClever-backend-coding-task.git
```

# Change directory

```
cd eClever-backend-coding-task
```

# Install NPM dependencies

```
yarn install
```
```
create .env file at the root directory
```
Samples:

- NODE_ENV=development
- APP_PORT=3001

# Database
- MONGODB_USER=xxx
- MONGODB_PASSWORD=xxx
- MONGODB_DATABASE=xxxx
- MONGODB_DOCKER_PORT=27017


# start the server without docker

```
yarn run dev
```
# # start the server with docker

```
docker-compose up or sudo docker-compose up
```

# To test the endpoint on postman
I used postman to test the api.
To use postman, go to the project doc folder and import the docs file into your postman client to ease the testing


## Developers Endpoints

- Create a developer - `http://localhost:3001/v1/api/developer`

- Get all developers - `http://localhost:3001/v1/api/developer`

- Get a specific developer - `http://localhost:3001/v1/api/developer/644f977b19b115001ce4e306`

- Get developers filtered by level - `http://localhost:3001/v1/api/developer/filter?level=senior`

- Edit a developer record - `http://localhost:3001/v1/api/developer/644f977b19b115001ce4e306`

- Delete a developer - `http://localhost:3001/v1/api/developer/644f977b19b115001ce4e306`
