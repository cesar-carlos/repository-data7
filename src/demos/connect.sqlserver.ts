import { DatabaseConfig } from '../../src/types/database_config';

import ConnectionSybase from '../../src/infra/connection.sybase';
import Database from '../../src/infra/database';

describe('test conect database ', () => {
  const configSqlServer: DatabaseConfig = {
    user: 'sa',
    password: '123abc.',
    dbname: 'JK',
    host: '127.0.0.1',
    port: 1433,
  };

  //TODO: CREATE DATA DRIVER
  const connectionSybase = new ConnectionSybase(configSqlServer);

  //TODO: DATABASE INJECT DRIVER CONNECTION
  const db = new Database(connectionSybase);

  it('database select', async () => {
    const result = await db.query('SELECT * FROM Cliente');
    console.log(result);
  });
});

export default {};
