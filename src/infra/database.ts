import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';
import ConnectionSqlServer from './connection.sql.server';
import ConnectionSybase from './connection.sybase';

export default class Database<T> {
  constructor(private database: ConnectionBaseSqlContract<T>) {}

  public async select<R>(sql: string): Promise<Array<R>> {
    try {
      let result: [] = [];
      const pool = (await this.database.getConnection()) as any;
      if (this.database instanceof ConnectionSqlServer) {
        result = await pool.request().query(sql);
        this.database.closeConnection(pool);
      }

      if (this.database instanceof ConnectionSybase) {
        result = await pool.request().query(sql);
        this.database.closeConnection(pool);
      }

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
