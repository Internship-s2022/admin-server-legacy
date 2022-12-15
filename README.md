# Getting started with Admin Server

## Domains

- https://admin.server.radiumrocket.com Production (master)
- https://uat.admin.server.radiumrocket.com UAT (uat)
- https://test.admin.server.radiumrocket.com Test (test)
- https://dev.admin.server.radiumrocket.com Develop (develop)

## Features

**TODO**: Add libraries when they are fully integrated

- 🏗 Built with [Express](http://expressjs.com/)
- 🚨 Testing powered by [jest](https://jestjs.io/docs/getting-started)

## Set up environment

Before installing the dependencies and running start the project, follow the next steps:

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) in case of not have it
2. Run `nvm install && nvm use && node -v` to use the node version defined on `.nvmrc` file
3. Run `yarn` to install all the node dependencies

## Available Scripts

In the project directory, you can run:

- Run `yarn start` to run the app in the development mode. Open [http://localhost:4000](http://localhost:4000) to check the server status.
- Run `yarn test` to run all tests.
- Run `yarn build` to create a production build.
- Run `yarn lint` to check the lint.
- Run `yarn lint:fix` to fix all the lint issues and format with prettier.

## Basic structure and configurations

```
src/                          // container to other folders with the source code of the app
  config/                     // configuration files
  constants/                  // global constants
  interfaces/                 // global interfaces
  middlewares/                // functions that should run on before some requests
    validations.ts            // validation that are being used on the middlewares
  models/                     // mongoose model schemes
  routes/                     // server routes
    public/                   // routes that can be request by anyone
    resource/                 // resource folder
      controllers.ts          // functions that are being used on the routes
      index.ts                // routes of the resource
      types.ts                // types that are needed on the resource
      resource.test.ts        // test of the resource
      validations.ts          // validate schemes
    index.ts                  // all the defined routes for the server
  seeds/                      // seeds for the testing
  utils/                      // reusable functions
  app.ts                      // server app
  index.ts                    // main file
.env                          // environment variables
package.json                  // deps and workspace scripts
tsconfig.json                 // typescript configuration
nodemon.json                  // nodemon configuration
README.md                     // docs are important
```

## Resource structure

**Note**: Consider that is not required to have on all cases the `routes` folder

Each Resource must follow the next structure and the name of it must be in `kebab-case`:

```
example/
  sub-route-a/
    sub-route-c/
    controllers.ts
    index.ts
    types.ts
    validations.ts
    sub-route-a.test.ts
  sub-route-b/
    controllers.ts
    index.ts
    types.ts
    validations.ts
    sub-route-b.test.ts
  controllers.ts          // functions that are being used on the routes
  index.ts                // routes of example
  types.ts                // types that are needed on example
  example.test.ts
  validations.ts
```

## Cron Job

To schedule jobs using node-cron, we need to invoke the method cron.schedule()

```
cron.schedule(expression, function, options);
```
### Example
![image](https://user-images.githubusercontent.com/94427392/207924865-0b096704-f8e1-4fa5-90ba-457fbcf12c6c.png)

#### In index
![image](https://user-images.githubusercontent.com/94427392/207926664-e1e5fb5d-3dd4-44d3-a745-eb29367eda3b.png)

### Cron expresions

This expression is used to specify the schedule on which a cron job is to be executed.

The cron expression is made up of 6 elements, separated by a space:

```
* * * * *
| | | | | |
| | | | | |
| | | | | day of week
| | | | month
| | | day of month
| | hour
| minute
second(optional)
```

### Cron function

The second argument of the cron.schedule method is a callback who indicates the function that will be executed every time when the cron expression triggers.

### Cron options

![Screenshot from 2022-12-15 13-20-23](https://user-images.githubusercontent.com/94427392/207915041-fa9b9553-b76a-4a1f-8903-f6e16c1ada74.png)

The scheduled option here is a boolean to indicate whether the job is enabled or not (default is true).

With the timezone option we can define the timezone in which the cron expression should be evaluated.

### Basic structure

```
helpers/
  cron-jobs/
    cron-job1.ts
    cron-job2.ts
    cron-job3.ts
    index.ts
```