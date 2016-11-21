import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as lodash from 'lodash';

// model imports
import { Sausage } from '../../../tito-node-api/src/model/identity/sausage';

// service imports
import { AuthenticationService } from '../common/service/authentication.service';
import { SausageService } from '../common/service/sausage.service';
import { StatService } from '../common/service/stat.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // public properties
  public currentSausage: Sausage;

  public constructor(private authenticationService: AuthenticationService,
    private sausageService: SausageService,
    private statService: StatService,
    private router: Router) {}

  public ngOnInit(): void {
    // Make sure we're starting with a fresh Sausage
    this.currentSausage = this.sausageService.getNewSausage();
  }

  public google(): void {
    if (!this.currentSausage) {
      this.router.navigate(['login']);
    }
    this.authenticationService.googleAuth(this.currentSausage)
      .then((result: any) => {
        if (result) {
          this.router.navigate(['']);
        }
      });
  }

  public login(): void {
    if (!this.currentSausage) {
      this.router.navigate(['login']);
    }
    this.authenticationService.login(this.currentSausage)
      .then((result: any) => {
        if (result) {
          this.router.navigate(['']);
        }
      });
  }

  public yahooStats(): void {
    this.statService.yahooStats()
      .then((result: any) => {
        console.log(`result: ${result}`);
      });
  }

  public getProtectedData(): void {
    // Use this to check the stat_id for the stat with the name: "Home Runs"
//    let u: string = 'http://fantasysports.yahooapis.com/fantasy/v2/game/mlb/stat_categories';
    // Use this to get stats for an individual player
//    let u: string = 'http://fantasysports.yahooapis.com/fantasy/v2/players;player_keys=mlb.p.9552/stats';
    // Use this to get stats for a list of players
    let u: string = 'http://fantasysports.yahooapis.com/fantasy/v2/players;player_keys=mlb.p.9552,mlb.p.7264/stats';
    this.statService.getData(u + '?format=json')
      .then((result: any) => {
        console.log(result);
        // let homerunStatId =
        //   this.getStatIdByName(result.fantasy_content.game[1].stat_categories,
        //   "Home Runs").stat_id;
        // console.log(homerunStatId);
        let homerunStatId = 12;
        // let homeruns =
        //   this.getStatValueById(result.fantasy_content.players[0].player, homerunStatId);
        // console.log(homeruns);
        lodash.forEach(result.fantasy_content.players, (player: any) => {
          if (lodash.isObject(player)) {
            let homeruns =
              this.getStatValueById(player.player, homerunStatId);
            console.log(homeruns);
          }
        });
      });
  }

  public getRequestToken(): void {
    this.statService.getRequestToken()
      .then((result: any) => {
        console.log(`result: ${result}`);
      });
  }

  public getAccessToken(): void {
    this.statService.getAccessToken('spwyp7')
      .then((result: any) => {
        console.log(`result: ${result}`);
      });
  }

  public refreshAccessToken(): void {
    this.statService.refreshAccessToken()
      .then((result: any) => {
        console.log(`result: ${result}`);
      });
  }

  // private methods
  private getStatIdByName(statCategories: any, name: string): any {
    let stats = statCategories.stats;
    let statMap = lodash.chain(stats).map("stat").value();
    let stat = lodash.find(statMap, { name: name });
    return stat;
  }

  private getStatValueById(player: any, statId: number): any {
    let stats = player[1].player_stats.stats;
    let matchingStat = lodash.find(stats, (s: any) => {
      return s.stat.stat_id == statId;
    });
    return matchingStat.stat.value;
  }
}
