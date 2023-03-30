import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  editorialSeleccionada: string = "";

  editoriales: Object = Object.entries(Publisher);

  heroe: Heroe = {
    id: "",
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.DCComics,
    alt_img: "",
  };

  isID: boolean = false;

  // SnackBar configuration
  durationInSeconds = 5;

  constructor
  (
    private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) { }


  ngOnInit(): void {

    if ( this._router.url.includes("editar") ) {
      this.isID = true;

      this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._heroesService.getHeroe(id))
      )
      .subscribe(heroe => { this.heroe = heroe });
    }

  }

  guardarHeroe(): void {

    if (this.heroe.id!.length == 0) {
      this._heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.mostrarSnackBar(`Héroe "${this.heroe.superhero}" creado correctamente`);
          this._router.navigate(["/heroes/editar", heroe.id]);
        }
        );
    }
    else if (this.heroe.id!.length > 0) {
      this._heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => {
          this.mostrarSnackBar(`Héroe "${this.heroe.superhero}" actualizado correctamente`);
          this._router.navigate(["/heroes/editar", heroe.id]);
        }
        );
    }
  }

  borrarHeroe(): void {

    const dialog = this._dialog.open( ConfirmarComponent, {
      width: "560px",
      minHeight: "180px",
      maxHeight: "inherit",
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe( result => {
        if ( result ) {
          this._heroesService.borrarHeroe( this.heroe.id! )
            .subscribe( heroe => {
              this._router.navigate(["/heroes/listado"])
            });
        }
      });

  }

  mostrarSnackBar( mensaje: string ): void {
    this._snackBar.open( mensaje, "Ok!", {
      duration: this.durationInSeconds * 1000
    });
  }

}
