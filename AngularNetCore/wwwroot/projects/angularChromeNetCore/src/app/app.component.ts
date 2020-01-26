import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular.Net App';
  constructor() {
    this.onClickMe();
  }

  onClickMe() {
    setTimeout(() => {
      debugger;
    }, 5000);

  }
}
