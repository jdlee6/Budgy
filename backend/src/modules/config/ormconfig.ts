import { DataSource } from 'typeorm';
// import { User } from '../../user/entity/user/user';
// import { Expense } from '../../expense/entity/expense/expense';
import { join } from 'path';

const options = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '',
  database: 'budgy',

  // paths may not be correct here
  entities: [join(__dirname, '/../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../../migrations/*{.ts,.js}')],
});

export default options;

options
  .initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((error) => console.error('Error initializing Data Source', error));
