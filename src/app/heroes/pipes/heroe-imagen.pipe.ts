import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'heroeImagen'
})
export class HeroeImagenPipe implements PipeTransform {

  transform( heroe: Heroe, isID?: boolean): string {
    isID = isID ?? false;
    let sub_editorial = heroe.id!.substring(0, heroe.id!.indexOf("-"));

    if ( isID ) {
      if ( !heroe.alt_img ) {
        if (sub_editorial === "dc" || sub_editorial === "marvel") {
          return `assets/heroes/${ heroe.id }.jpg`
        }
        else {
          return `assets/heroes/no-image.png`;
        }
      }
      else {
        return heroe.alt_img;
      }
     
      
    }
    else {
      if ( !heroe.alt_img ) {
        if (sub_editorial === "dc" || sub_editorial === "marvel") {
          return `assets/heroes/${ heroe.id }.jpg`
        }
        else {
          return `assets/heroes/no-image.png`;
        }
      }
      else {
        return heroe.alt_img;
      }
    }
    
  }

}
