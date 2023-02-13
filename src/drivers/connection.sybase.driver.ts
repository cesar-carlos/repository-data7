import Request from './connection.request';
const Sybase = require('sybase');

export class ConnectionSybaseDriver {
  private conn;

  constructor(private config: any) {
    this.conn = new Sybase(
      this.config.host,
      this.config.port,
      this.config.dbname,
      this.config.user,
      this.config.password,
      true,
    );
  }

  public request(): Request {
    return new Request(this.conn);
  }

  public connect(): Promise<ConnectionSybaseDriver> {
    return new Promise((resolve, reject) => {
      this.conn.connect((err: any) => {
        if (err) return reject(err);
        return resolve(this);
      });
    });
  }

  public close(): void {
    this.conn.isConnected() && this.conn.disconnect();
  }
}
