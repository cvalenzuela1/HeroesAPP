import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {

  termino: string = "";
  heroes: Heroe[] = [];

  heroeSeleccionado!: Heroe;

  constructor( private heroesService: HeroesService ) { }

  buscando(): void {
    this.heroesService.getSugerencias( this.termino )
      .subscribe( heroes => {
        this.heroes = heroes;
      });
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {
    const heroe: Heroe = event.option.value;
    // console.log( heroe.superhero );
    this.termino = heroe.superhero;
    
    this.heroeSeleccionado = heroe;
  }

}