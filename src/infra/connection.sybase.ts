import { ConnectionSybaseDriver } from '../drivers/connection.sybase.driver';
import { DatabaseConfig } from '../types/database_config';

import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';

export default class ConnectionSybase implements ConnectionBaseSqlContract<ConnectionSybaseDriver> {
  constructor(private config: DatabaseConfig) {}

  async getConnection(): Promise<ConnectionSybaseDriver> {
    try {
      const conn = this.getConnectionConfig(this.config);
      const connect = new ConnectionSybaseDriver(conn);
      const pool = await connect.connect();
      return pool;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private getConnectionConfig(confg: DatabaseConfig): any {
    return {
      name: 'main',
      host: confg.host,
      port: confg.port,
      dbname: confg.dbname,
      username: confg.user,
      password: confg.password,
      logTiming: true,
    };
  }

  closeConnection(pool: ConnectionSybaseDriver): void {
    pool.close();
  }
}
