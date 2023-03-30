import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editorialValue'
})
export class EditorialValuePipe implements PipeTransform {

  transform( editorial_valor: Object ): string {
    return editorial_valor.toString().substring(editorial_valor.toString().indexOf(",")+1);
  }

}
