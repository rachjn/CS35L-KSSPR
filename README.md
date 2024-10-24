# Oops I Had an Acc(id)ent

Oops I Had an Acc(id)ent is a typing game designed to improve the user's understaning of accented English, visually inspired by the Recaptcha test. Just like Recaptcha challenges users to prove they are human by identifying distorted letters, our game challenges players to understand and type accented English, demonstrating their adaptability. Players choose a region, listen to accented speech, and type what they hear to prevent their robot from falling, ultimately earning the 'I’m not a robot' checkmark by embracing diversity and new perspectives.

## Developing Locally

### Prerequisites

Make sure you have the latest version of [Node.js](https://nodejs.org/en) installed (v20). Nothing is guaranteed to work otherwise.

Also ensure your `npm` version is v10 (run `npm --version` to check).

Instructions on downloading both can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Setup

These commands should be run in the root project directory (the one that this file is in).

1. Run `npm install`. This will install the necessary packages for both the client Next.js app and the Express server.
2. To start developing, run `npm run dev`. This will create local servers serving both the website itself and the backend endpoints. These servers will refresh upon any changes to the code so you don't have to worry about re-running this command while developing.
3. To run a production version of the website run the following commands:

```sh
npm run build
npm start
```

For further instructions and documentation, refer to the individual [client](client/README.md) and [server](server/README.md) READMEs.
