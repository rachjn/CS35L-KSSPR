# Oops I Had an Acc(id)ent

Oops I Had an Acc(id)ent is a typing game designed to improve the user's understaning of accented English, visually inspired by the Recaptcha test. Just like Recaptcha challenges users to prove they are human by identifying distorted letters, our game challenges players to understand and type accented English, demonstrating their adaptability. Players choose a region, listen to accented speech, and type what they hear to prevent their robot from falling, ultimately earning the 'I’m not a robot' checkmark by embracing diversity and new perspectives.

## Developing Locally

### Prerequisites

Make sure you have the latest version of [Node.js](https://nodejs.org/en) installed (v20). Nothing is guaranteed to work otherwise.

Also ensure your `npm` version is v10 (run `npm --version` to check).

Instructions on downloading both can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Setup

These commands should be run in the root project directory (the one that this file is in).

1. Run `npm install`. This will install the necessary packages for running the app.
2. Run `npx prisma migrate dev`. This will initialize the SQLite database in the `prod.db` file, run the seed scripts, and generate the type definitions. For more information on how to interact with the database, go to [the Database section](#database).
3. Run `npx auth secret` to generate a secret key to use to sign JWTs for authentication.
4. Finally, to start developing, run `npm run dev`. This will create a local server serving both the website itself and the backend endpoints. These server refreshes upon any changes to the code so you do not have to worry about re-running this command while developing.
5. To run a production version of the website run the following commands:

```sh
npm run build
npm start
```

## Database

We use [SQLite](https://www.sqlite.org/) for storing data related to users, challenges, and scores. The [Prisma](https://www.prisma.io/) ORM enables us to interact with this database in a simple, more intuitive way with pure Node.js rather than SQL queries.

If you make any changes to the database (the `schema.prisma` file), you must create a migration so the database can migrate the database to the new desired state. You can do this by running `npx prisma migrate dev` and following its instructions.

If you just want to try your change locally, you can run `npx prisma db push` to migrate your local database without creating a formal migration file.

It can be difficult to know what is in your database at any given time. Prisma allows us to view the tables/rows in a web GUI using the `npx prisma studio` command.
