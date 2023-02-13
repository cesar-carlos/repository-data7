import { DatabaseConfig } from '../types/database_config';
import { ConnectionSqlServerDriver } from '../drivers/connection.sqlserver.driver';

import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';

export default class ConnectionSqlServer implements ConnectionBaseSqlContract<ConnectionSqlServerDriver> {
  constructor(private config: DatabaseConfig) {}

  async getConnection(): Promise<ConnectionSqlServerDriver> {
    try {
      const connect = new ConnectionSqlServerDriver(this.config);
      const pool = await connect.connect();
      return pool;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  closeConnection(pool: ConnectionSqlServerDriver): void {
    pool.close();
  }
}
