import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || './database.sqlite',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};