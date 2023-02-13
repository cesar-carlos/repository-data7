import { ConnectionSybaseDriver } from '../drivers/connection.sybase.driver';
import { DatabaseConfig } from '../types/database_config';

import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';

export default class ConnectionSybase implements ConnectionBaseSqlContract<ConnectionSybaseDriver> {
  constructor(private config: DatabaseConfig) {}

  async getConnection(): Promise<ConnectionSybaseDriver> {
    try {
      const connect = new ConnectionSybaseDriver(this.config);
      const pool = await connect.connect();
      return pool;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  closeConnection(pool: ConnectionSybaseDriver): void {
    pool.close();
  }
}
