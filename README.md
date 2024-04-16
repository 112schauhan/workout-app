This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Next JS App on running.
Open [http://localhost:3000/api/graphql] for running the Apollo Server.

## INSTALL PACKAGES
Run npm install to get all the required dependencies for the project.
Use a connection string of your own, if using a different database. 
## Project has been configured with mongodb atlas as the backend. 
To use it, whitelist the IP address, and add the connection string url. 

Used workoutmodels and exercisesmodels collection for managing and storing data.

## This is a Basic Calendar where you can create your own workouts - comprising of multiple exercises. 
The app facilitates addition of Workout, creation of exercises. 

## Test Integration
Cypress has been configured for test cases

Use npm run cypress to run the cypress test environment