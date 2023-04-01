import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  heroes_img = {
    superman: "assets/heroes/dc-superman.jpg",
    batman: "assets/heroes/dc-batman.jpg",
    hulk: "assets/heroes/marvel-hulk.jpg",
    ironman: "assets/heroes/marvel-iron.jpg"
  }
}
