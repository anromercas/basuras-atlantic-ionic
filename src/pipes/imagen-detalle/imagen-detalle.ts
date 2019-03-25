import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenDetalle',
})
export class ImagenDetallePipe implements PipeTransform {
  
  transform(img: string,  defecto: string = "Sin Imagen") {

    if ( !img ){
      return 'src/assets/imgs/no-image.jpg';
    }

    return ( img ) ? img: defecto;
  }
}
