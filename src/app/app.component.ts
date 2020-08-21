import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-microfrontend';
  counter: number = 0;

  public handleOnClick() {
    this.counter++;
  }

  public handleOnDecrease() {
    this.counter <= 0 ?
      window.alert("udah woi !")
    :
      this.counter--; 
  }

}
