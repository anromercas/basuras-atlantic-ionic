import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Basura } from '../../interfaces/basura.interface';
import { CalificaPage } from '../califica/califica';
import { EjemplosPage } from '../ejemplos/ejemplos';
import { BasuraProvider } from '../../providers/basura/basura';
import { MostrarImagenPage } from '../mostrar-imagen/mostrar-imagen';


@Component({
  selector: 'page-basura',
  templateUrl: 'basura.html',
})
export class BasuraPage {

  basura: Basura;
  basuras: Basura[] = [];
  basurasNombre: Basura[] = [];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _basuraProv: BasuraProvider) {
    this.basura = this.navParams.get("basura");

    _basuraProv.listarHistorico()
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
            codigoContenedor: basura.payload.doc.data().codigoContenedor,
            key: basura.payload.doc.id
          }
      });
      this.mostrarBasuras(); 
    });
  }

  mostrarBasuras(){
  this.basuras.forEach( basura => {
    if(basura.nombre == this.basura.nombre && basura.zona == this.basura.zona){
      this.basurasNombre.push(basura);
    }
  });
  }

  mostrar_imagen() {
    this.navCtrl.push( MostrarImagenPage, { 'basura': this.basura } );
  }

  verEjemplos(){
    this.navCtrl.push( EjemplosPage );
  }

  calificar() {
    this.navCtrl.push( CalificaPage, { 'basura': this.basura } );
    
  }

}
