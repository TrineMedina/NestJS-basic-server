## Description

This is an app for users to add their triathlon race data, store and compare race statistics
over time

## Running the app

```bash
# development
$ npm run db:dev:restart (ensure you have Docker running)
$ npm run db:test:restart (this will deploy the testing database)
$ npm run test:e2e (this runs e2e testing)


# production mode
$ npm run start:prod
```

# Tech Stack

$ Language: TypeScript
$ Server Framework: NestJS
$ Database: PostgreSQL/Prisma -> Running on a Docker image
$ Auth: Passport-JWT, Argon2
$ Testing: SuperTest, Jest
