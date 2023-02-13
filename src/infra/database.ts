import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';
import ConnectionSqlServer from './connection.sql.server';
import ConnectionSybase from './connection.sybase';

export default class Database<T> {
  constructor(private database: ConnectionBaseSqlContract<T>) {}

  public async query<R>(command: string): Promise<Array<R>> {
    let pool: any = undefined;

    try {
      pool = await this.database.getConnection();
      const result = await pool.request().query(command);
      return result;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      if (pool) this.database.closeConnection(pool);
    }
  }
}
