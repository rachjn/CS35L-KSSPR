# Oops I Had an Acc(id)ent

<img width="1156" alt="Main Page" src="https://github.com/user-attachments/assets/4dc0ee09-0588-494b-aa9b-8796df4e5654">

"Oops I Had an Acc(id)ent" is an educational typing game that challenges users to type what they hear — specifically, words spoken in different English accents from around the world. By practicing with these accents, you’ll improve your listening and typing skills while also becoming more comfortable with how English sounds across different cultures and regions. Our goal is to help users build a deeper understanding and appreciation for accents, while also promoting inclusivity and empathy.

<img width="1173" alt="Map Page" src="https://github.com/user-attachments/assets/196d53a4-2b91-48ce-aa9d-0a3aaeb634db">

### Main Features 
1. User Authentication / Authorization
- Users can create an account using our sign-in page 
- Data from user interactions is associated with their account

2. Upload data from the client to the back-end, which persists (saves) the data
 to the server’s file system: 
- Users play our game and their input is uploaded to our backend
- Score is calculated from input and persisted in the database

3. Meaningfully search through server-side data: 
- Users can search for scores on the scoreboard by inputting usernames
- Users can also filter scores by region

<img width="1159" alt="Game Page" src="https://github.com/user-attachments/assets/8f3e4a00-3315-4689-ae5b-cb6afc1d29bb">

### Additional Features 
1. Score Breakdown
- Users can see a calculated score breakdown on a separate page after their game ends
- Can share a link to this page with others

2. Scoreboard 
- Users can view a sorted list of top scores across all users

3. Profile
- Users can view their highest scores and WPM on their profile page
- Can also see an overview of their most recent games played

4. Live Feedback
- Users can view live feedback based on their typing input if their words are correct or incorrect 



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
