import sql, { ConnectionPool } from 'mssql';

import { DatabaseConfig } from '../types/database_config';
import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';

export default class ConnectionSqlServer implements ConnectionBaseSqlContract<ConnectionPool> {
  constructor(private config: DatabaseConfig) {}

  async getConnection(): Promise<ConnectionPool> {
    try {
      const conn = this.getConnectionConfig(this.config);
      const pool = await sql.connect(conn);
      return pool;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private getConnectionConfig(confg: DatabaseConfig): any {
    return {
      user: confg.user,
      password: confg.password,
      database: confg.dbname,
      server: confg.host,
      port: confg.port,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: false, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  }

  closeConnection(pool: ConnectionPool): void {
    pool.close();
  }
}
