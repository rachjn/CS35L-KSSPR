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

---

# Next.js documentation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
