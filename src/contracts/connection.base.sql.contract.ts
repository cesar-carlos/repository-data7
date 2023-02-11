import { DatabaseConfig } from '../types/database_config';

export default interface ConnectionBaseSqlContract<T> {
  getConnection(): Promise<T>;
  closeConnection(conn: T): void;
}
