# Introduction

## First steps
- copy *.env.example* into *.env*

## dev server
- run `yarn app:build`
- run `yarn app:dev` or `yarn app:dev:restart`
- run `yarn log:node`
- open `localhost:3040`


## prod server
- run `yarn app:build`
- run `yarn app:prod` or `yarn app:prod:restart`
- open `localhost:3040`

## Shortcuts
### node commands
- main commands
- - start:dev - start local server
- - npm run lint - each file will be linted
- - doc:gen - generate the documentation
- cli commands
- - cli:bdcheck - check db connection
- - cli:iocheck - check socket connection between services
- - cli:redis - get list of values from redis
### docker commands
- app commands
- - app:stop - down containers
- - app:build - build images
- - app:dev - start only db, redis and adminer
- - app:dev:restart - restart dev instance
- - app:prod - start node container
- - app:prod:restart - restart all containers
- other commands
- - open:node - exec node container
- - log:node - exec node logs
