import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute, private heroesService: HeroesService ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroe( id )),
        tap( console.log )
      )
      .subscribe( heroe => {
        this.heroe = heroe;
      });
  }
}
