import { RepositoryBase } from '../_repository.base';

// model imports
import { Stat } from '../../model/tito/stat';
import { StatDocument } from './stat.document';

export class StatRepository extends RepositoryBase<Stat> {
  // constructor
  public constructor() {
    super();
  }

  public create(model: Stat): any {
    let document = new StatDocument(model);

    return document.save<Stat>();
  }

  public find(): any {
    let stats = [
      { name: "homeruns", value: 10 } as Stat,
    ];
    return new Promise<Stat[]>((resolve, reject) => {
      resolve(stats);
    });
//    return StatDocument.find({}).exec();
  }

  public findByName(name: string): any {
    return StatDocument.findOne({name: name}).exec();
  }

  public findById(id: string): any {
    return StatDocument.findById(id).exec();
  }
}
