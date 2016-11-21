// repository imports
import { RepositoryBase } from '../repository/_repository.base';

export abstract class ServiceBase<T> {
  public constructor(protected _repository: RepositoryBase<T>) {}

  public create(model: T): Promise<T> {
    let promise: Promise<T> = new Promise<T>((resolve, reject) => {
      this._repository.create(model)
        .then((d: any) => {
          resolve(d);
        })
        .catch((e: any) => {
          reject(e);
        });
    });

    return promise;
  }

  public find(): Promise<T[]> {
    let promise: Promise<T[]> = new Promise<T[]>((resolve, reject) => {
      this._repository.find()
        .then((d: any) => {
          resolve(d);
        })
        .catch((e: any) => {
          reject(e);
        });
    });

    return promise;
  }

  public get(id: string): Promise<T> {
    let promise: Promise<T> = new Promise<T>((resolve, reject) => {
      this._repository.findById(id)
        .then((d: any) => {
          resolve(d);
        })
        .catch((e: any) => {
          reject(e);
        });
    });

    return promise;
  }
}
