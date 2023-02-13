import { DatabaseConfig } from '../../src/types/database_config';
import ConnectionSqlServer from '../../src/infra/connection.sql.server';

describe('test conect database sql-server', () => {
  const config: DatabaseConfig = {
    user: 'sa',
    password: '123abc.',
    dbname: 'JK',
    host: '127.0.0.1',
    port: 1433,
  };

  const connection = new ConnectionSqlServer(config);

  it('instace database sql-server', async () => {
    const pool = await connection.getConnection();
    expect(pool).toBeDefined();
    connection.closeConnection(pool);
  });

  it('close database sql-server', async () => {
    const pool = await connection.getConnection();
    connection.closeConnection(pool);
    expect(pool).toBeDefined();
  });

  it('data base version', async () => {
    const pool = await connection.getConnection();
    const result = await pool.request().query('SELECT @@VERSION AS version');
    const data = { ...result[0] };
    expect(data.version).toContain('Microsoft SQL Server');
    connection.closeConnection(pool);
  });
});

export default {};
