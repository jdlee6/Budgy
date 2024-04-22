import { DataSource } from 'typeorm';
import { join } from 'path';
// import dotenv from 'dotenv';

// dotenv.config();

const options = new DataSource({
  // type: 'postgres',
  // host: process.env.HOST,
  // port: Number(process.env.PORT),
  // username: process.env.USERNAME,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '',
  database: 'budgy',
  entities: [join(__dirname, '../**/entity/*{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
});

export default options;

options
  .initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((error) => console.error('Error initializing Data Source', error));
