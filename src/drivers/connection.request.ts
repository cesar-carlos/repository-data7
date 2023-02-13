import { ISqlType } from 'mssql';

export default class Request {
  private inputs: any = [];
  constructor(private pool: any) {}

  public input(name: string, type: (() => ISqlType) | ISqlType, value: any): Request {
    this.inputs.push({ name, type, value });
    return this;
  }

  public query(command: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const sql = this.inputs.reduce((acc: string, input: any) => {
        if (input.type.toString().includes('Date')) {
          const value = `'${new Date(input.value).toISOString().slice(0, 19).replace('T', ' ')}'`;
          const _input = value === undefined ? 'NULL' : value;
          return acc.replace(`@${input.name}`, _input);
        } else {
          const value = typeof input.value === 'string' ? (input.value = `'${input.value}'`) : input.value;
          const _input = value === undefined ? 'NULL' : value;
          return acc.replace(`@${input.name}`, _input);
        }
      }, command);

      try {
        const data: any = await new Promise((resolve, reject) => {
          this.pool.query(sql, (err: any, data: any) => {
            if (err) return reject(err);
            return resolve(data);
          });
        });

        if (data.recordset) {
          return resolve(data.recordset);
        }
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
