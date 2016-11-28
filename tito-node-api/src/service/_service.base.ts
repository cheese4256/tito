// repository imports
import { RepositoryBase } from '../repository/_repository.base';
import { ValidatorBase } from '../validation/_validator.base';
import { ValidationError } from '../validation/validation-error';

export abstract class ServiceBase<T> {
  public constructor(protected _repository: RepositoryBase<T>,
    protected _validator: ValidatorBase<T>) {}

  public create(model: T): Promise<T> {
    let promise = new Promise<T>((resolve: any, reject: any) => {

      // validate the model
      this._validator.create(model)
        .then(() => {
          // invoke repository operations for valid model instances
          this._repository.create(model)
            .then((d: T) => {
              resolve(d);
            })
            .catch((e: any) => {
              reject(e);
            });
        }).catch((e: any) => {
          // reject the promise if the validation failed
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
