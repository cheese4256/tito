import { RepositoryBase } from './_repository.base';

// model imports
import { Sausage } from '../model/identity/sausage';
import { SausageDocument } from './document/sausage/sausage.document';

export class SausageRepository extends RepositoryBase<Sausage> {
  // constructor
  public constructor() {
    super();
  }

  public create(model: Sausage): any {
    let document = new SausageDocument(model);

    return document.save();
  }

  public find(): any {
    return SausageDocument.find({}).exec();
  }

  public findByEmail(email: string): any {
    return SausageDocument.findOne({email: email}).exec();
  }

  public findByGoogleId(googleId: string): any {
    return SausageDocument.findOne({googleId: googleId}).exec();
  }

  public findById(id: string): any {
    return SausageDocument.findById(id).exec();
  }
}
