
## Installation and Usage
1. Install dependencies: `yarn install`
2. Start a PostgreSQL database with docker using: `docker-compose up -d`. 
    - If you have a local instance of PostgreSQL running, you can skip this step. However you will need to update the `DATABASE_URL` inside the `.env` file with the correct environment variable. 
3. Apply database migrations: `npx prisma migrate dev` 
4. Run Seed: `npx prisma db seed`
5. Start the project:  `yarn run start:dev`
6. Access the project at http://localhost:3000/api
7. Login Via Admin: `email: admin@test.com password: test@123`
8. Create logs folder and update in .env
9. Update RabitMQ connection ulr in .env
10. Customer can access only GET BOOKS, GET Book By Id, GET My Orders only and Auth routes

#### Pagination, optimizations and edge cases need to be handled.
