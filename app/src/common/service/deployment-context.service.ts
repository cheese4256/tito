import { Injectable } from '@angular/core';

@Injectable()
export class DeploymentContextService {
  // private properties
  private _baseUrl: string;

  // constructor
  public constructor() {
    console.log(`DeploymentContextService - online with: ${JSON.stringify(process.env)}`);
    this._baseUrl = `${process.env.API_HOST}/api`;
  }

  // public methods
  public buildApiUrl(relativePath: string) {
    return `${this._baseUrl}/${relativePath}`;
  }
}
