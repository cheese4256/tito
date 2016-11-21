import { RepositoryBase } from './_repository.base';

// model imports
import { Team } from '../model/team';
import { TeamDocument } from './document/team/team.document';

export class TeamRepository extends RepositoryBase<Team> {
  // constructor
  public constructor() {
    super();
  }

  public create(model: Team): any {
    let document = new TeamDocument(model);

    return document.save();
  }

  public find(): any {
    let teams = [
      { name: "CheeseDome" } as Team,
      { name: "Deere Mark Henderson" } as Team,
      { name: "Doughboys" } as Team,
      { name: "El Guapo" } as Team,
      { name: "Hillbillies" } as Team,
      { name: "Mascot Man" } as Team,
      { name: "weaveo" } as Team
    ];
    return new Promise<Team[]>((resolve, reject) => {
      resolve(teams);
    });
//    return TeamDocument.find({}).exec();
  }

  public findByName(name: string): any {
    return TeamDocument.findOne({name: name}).exec();
  }

  public findById(id: string): any {
    return TeamDocument.findById(id).exec();
  }
}
