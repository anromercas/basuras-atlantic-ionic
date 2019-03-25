import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Basura } from '../../interfaces/basura.interface';
import { BasuraProvider } from '../../providers/basura/basura';

@Component({
  selector: 'page-ejemplos',
  templateUrl: 'ejemplos.html',
})
export class EjemplosPage {

  basuras: Basura[] = [];
  basurasDeEjemplo: Basura[] = [];
  basurasDeEjemplo2: Basura[] = [];
  basurasDeEjemplo3: Basura[] = [];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _basuraProv: BasuraProvider) {

                _basuraProv.listarBasuras()
                .subscribe( (basurasSnapshot) =>{
                  this.basuras = basurasSnapshot.map( (basura: any) => {

                      return {
                        nombre: basura.payload.doc.data().nombre,
                        calificacion: basura.payload.doc.data().calificacion,
                        fecha: basura.payload.doc.data().fecha,
                        img: basura.payload.doc.data().img,
                        zona: basura.payload.doc.data().zona,
                        observaciones: basura.payload.doc.data().observaciones,
                        llenado: basura.payload.doc.data().llenado,
                        estado: basura.payload.doc.data().estado,
                        key: basura.payload.doc.id
                      }
                  });
                  this.mostrarBasuras(); 
                });
  }

  mostrarBasuras(){
    let cont = 0;
    this.basuras.forEach( basura => {
      if( basura.img ){
        cont ++;
        if(cont < 3) {
          this.basurasDeEjemplo.push(basura);
        } else if (cont > 2 && cont < 6){
          this.basurasDeEjemplo2.push(basura);
        } else if(cont > 5 && cont < 9) {
          this.basurasDeEjemplo3.push(basura);
        }
      }
    });
  }
}
