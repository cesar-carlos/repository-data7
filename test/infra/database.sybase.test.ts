import { DatabaseConfig } from '../../src/types/database_config';
import ConnectionSybase from '../../src/infra/connection.sybase';

describe('test conect database sybase', () => {
  const config: DatabaseConfig = {
    user: 'dba',
    password: 'sql',
    dbname: 'Turatti',
    host: '127.0.0.1',
    port: 2639,
  };

  const connection = new ConnectionSybase(config);

  it('instace database sybase', async () => {
    const pool = await connection.getConnection();
    expect(pool).toBeDefined();
    connection.closeConnection(pool);
  });

  it('close database sybase', async () => {
    const pool = await connection.getConnection();
    connection.closeConnection(pool);
    expect(pool).toBeDefined();
  });

  it('data base version sybase', async () => {
    const pool = await connection.getConnection();
    const result = await pool.request().query('SELECT @@VERSION AS version');
    const data = { ...result[0] };
    expect(data.version).toContain('16.0.0');
    connection.closeConnection(pool);
  });
});

export default {};
