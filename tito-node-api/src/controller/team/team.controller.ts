import { ControllerBase } from '../_controller.base';

// model imports
import { Team } from '../../model/tito/team';

// service imports
import { TeamService } from '../../service/team/team.service';

export class TeamController extends ControllerBase<Team> {
  // constructor
  constructor(protected _service: TeamService) {
    super(_service);
  }

  // public methods
  public getTeams(httpRequest: any, httpResponse: any): void {
/*
    // Make sure they sent the correct header
    if (!httpRequest.headers || !httpRequest.headers.authorization) {
      httpResponse.status(401).send({ message: "You must be logged in to see the teams."});
    }

    // Now make sure they sent a valid JWT
    // First extract the token from the "Bearer " text by splitting on the space in between
    let token: string = httpRequest.headers.authorization.split(' ')[1];
    let jwtSecret:string = config.get('jwt.secret').toString();
    // Get the payload from the JWT
    let payload: any = this._jwtService.decode(token, jwtSecret);

    // Make sure it has a subject (the sausage's id)
    if (!payload.sub) {
      httpResponse.status(401).send({ message: "Authentication failed."});
    }
*/
    this.find(httpRequest, httpResponse);
  }
}
