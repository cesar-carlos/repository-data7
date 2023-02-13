import Request from './connection.request';
import sql, { ConnectionPool } from 'mssql';

export class ConnectionSqlServerDriver {
  private conn: ConnectionPool | undefined;
  constructor(private config: any) {}

  private async inicialize(): Promise<void> {
    this.conn = await sql.connect({
      user: this.config.user,
      password: this.config.password,
      database: this.config.dbname,
      server: this.config.host,
      port: this.config.port,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: false, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    });
  }

  public request(): Request {
    return new Request(this.conn);
  }

  public async connect(): Promise<ConnectionSqlServerDriver> {
    await this.inicialize();
    return new Promise((resolve, reject) => {
      if (this.conn) resolve(this);
      else reject(new Error('Connection not inicialized'));
    });
  }

  public close(): void {
    if (this.conn) this.conn.close();
  }
}
