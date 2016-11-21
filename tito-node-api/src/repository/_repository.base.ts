export abstract class RepositoryBase<T> {
  public abstract create(model: T): any;
  public abstract find(): any;
  public abstract findById(id: string): any;
}
