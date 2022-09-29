import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clase5-a';

  public flag: boolean = true;

  onHide(): void {
    this.flag = !this.flag;
  }

}
