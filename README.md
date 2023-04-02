# Simple Job Board
This is a simple job board that does not require any user registrations to post jobs or apply for jobs.

## Installation and setup

#### Clone the repository.
```
git clone git@github.com:yukio5347/nextjs-simple-job-board.git
```

#### Go to the project directory
```
cd nextjs-simple-job-board
```

#### Install packages
```
npm install
```

#### Setup the `.env` file.
```
cp .env.example .env
```
Edit at least `DATABASE_URL` variable.

#### Create tables
```
npx prisma db push
```