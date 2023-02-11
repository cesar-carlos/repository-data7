import { DatabaseConfig } from '../../src/types/database_config';

import ConnectionSqlServer from '../../src/infra/connection.sql.server';
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

  const configSybase: DatabaseConfig = {
    user: 'dba',
    password: 'sql',
    dbname: 'Turatti',
    host: '127.0.0.1',
    port: 2639,
  };

  //TODO: CREATE DATA DRIVER
  const connectionSqlServer = new ConnectionSqlServer(configSqlServer);
  const connectionSybase = new ConnectionSybase(configSybase);

  //TODO: DATABASE INJECT DRIVER CONNECTION
  const db = new Database(connectionSybase);

  it('database select', async () => {
    const result = await db.select('SELECT * FROM Cliente');
    console.log(result);
  });
});

export default {};
