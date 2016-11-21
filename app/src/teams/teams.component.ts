import { Component } from '@angular/core';

// model imports
import { Team } from '../../../tito-node-api/src/model/team';

// service imports
import { AuthenticationService } from '../common/service/authentication.service';
import { TeamService } from '../common/service/team.service';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html'
})
export class TeamsComponent {
  // public propoerties
  public teams: Team[];

  public constructor(private authenticationService: AuthenticationService,
    private teamService: TeamService) {
      teamService.getTeams()
        .then(response => {
          this.teams = response;
        })
        .catch(err => {
          console.log("Unable to get teams: " + err);
          console.log(err.message);
        });
    }
}
