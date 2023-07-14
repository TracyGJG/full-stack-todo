# full-stack-todo
Source code supporting my [step-by-step tutorial](https://dev.to/tracygjg/full-stack-to-do-list-a-step-by-step-tutorial-3oom) for the development of a full-stack todo application.

> NB: The source code in this repository is NOT PRODUCTION GRADE and should be used for educational purposes only.

The online tutorial follows a six-part step-by-step process to the development of a three-tier stack that aligns with the stucture of many web-enables business systems. The three tiers are:
 * Frontend (FE) that typically describes the User Interface (UI) but could be any sub-system that interacts with the API (Application Programming Interface).
 * Backend (BE), also known as the Business Layer as is typically repsponsible for delivering the buiness logic of the application. The BE exposes the API to the frontend but also calls on other APIs to the persistence layer and other external services.
 * Database (DB) (aka peristence layer) is responsile for the long-term storage and retrieval of data.

 The primary topic of the tutorial article is not, however, the three tiers but the two interfaces between them.
 * FE/BE: Frontend calling the API supplied by the Backend. 
 * BE/DB: Backend calling the API of the database management system (DBMS).

 The database can be document, relational or any other reliable persistence model.

Both the FE/BE and BE/DB interfaces of our example application supports four functions, often refered to CURD operations, through its public interface:
* Create to add new item to storage
* Read to retrieve one or more items from storage
* Update to modify a single (or multiple) stored item(s)
* Delete a single (or multiple) stored items(s)

In the FE/BE interface the FE public interface will instigate calls to the BE API. There are other forms but our example is quite typical and employ the REST web service approach. REST uses the HTTP methods/verbs (GET, POST, PATCH and DELETE) to perform the CRUD operations. The BE/DB interface tends to be specific to the persistence mechansim and the public interface exposed by the DBMS.

## Pre-requisites
Before being able to use the source code of this repo, the following products will need to be installed.

* An editor or Integrated Development Environment (IDE) of your choice. I highly recommend [Microsoft Visual Studio Code (VSCode)](https://code.visualstudio.com/).
* A JavaScript runtime, primarily [Node.JS](https://nodejs.org/en), which includes [NPM](https://www.npmjs.com/). You might also want to consider installing [Node Verson Manager (NVM)](https://github.com/nvm-sh/nvm).

Otherwise, all the other dependencies are referenced within the project.json file for each step. Before investigating the source code for each step, the following command should be executed using the command line in the folder for the step.

`npm i` or `npm install`.

The package.json file will also include script to start servers, execute tests, etc.

If you want to follow along with the tutorial you should also register for a free [MongoDB Atlas](https://www.mongodb.com/) account. I would also suggest you consider getting a copy of the [postman](https://www.postman.com/) utility to interact with the databases (MongoDB and json-server) directly; without out UI.

## Step One: Memory Array
* test: uses the [jest](https://jestjs.io/) test framework to exercise the unit test.
* start: executes the [json-server](https://github.com/typicode/json-server#readmehttps://github.com/typicode/json-server#readmehttps://github.com/typicode/json-server#readme) to make the integration test available.

## Step Two: Web Storage
_As above._

## Step Three: JSON-sever
_As above._

## Step Four: Express Array
* start - executes the node-base express server that supplies the API (application server) and the frontend (web server), which can be utilised by navigating to `localhost:3000` in the web browser.

## Step Five: Express JSON
* server - starts a json-server execution but this time for use behind the Express server so it is accessible via port 3300.
* start - again commences the Express server but now with a proxy database.

## Step Six: Express DB
* start - yet again executes the Express server but this time the database is provided by MangoDB.

In order to use a MongoDB database a secure connection from the BE will need to be established with keys etc. provided when registering with the service provider. The credentials should not be included in the public repo code so you will not find a .env file I used to contain the following parameters for step six.

```text
USER_ID=USER_ID
USER_PWD=USER_PASSWORD
DB_NAME=DATABASE_NAME
DB_COLLECTION=COLLECTION_NAME
```

Just replace the text right of the equals sign with your particulars.

And that's it. I hope you enjoy the tutorial and learn a lot. If you have any comments and suggestions please either and an issue in the repo or add a comment to the article.
