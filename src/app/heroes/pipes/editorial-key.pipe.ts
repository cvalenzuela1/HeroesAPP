import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editorialKey'
})
export class EditorialKeyPipe implements PipeTransform {

  transform( editorial_key: Object ): string {
    return editorial_key.toString().substring(0, editorial_key.toString().indexOf(","));
  }

}
