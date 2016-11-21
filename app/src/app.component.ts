// app.component.ts
import { Component } from '@angular/core';

import './style/site.scss';

@Component({
  selector: 'tito-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public constructor() {
    let params: string = window.location.search.substring(1);
    // let element = document.getElementById('shortCode');
    // let shortCode: string = element ? element.textContent : "no shortCode";
    // console.log(shortCode);
    if (params
        && window.opener
        && window.opener.location.origin === window.location.origin) {
      let pair: string[] = params.split('=');
      let code: string = decodeURIComponent(pair[1]);

      window.opener.postMessage(code, window.location.origin);
    }
  }
}
