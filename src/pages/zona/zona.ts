import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Zona } from '../../interfaces/zona.interface';
import { Basura } from '../../interfaces/basura.interface';
import { BasuraPage } from '../basura/basura';
import { CalificaPage } from '../index.paginas';
import { BasuraProvider } from '../../providers/basura/basura';

@Component({
  selector: 'page-zona',
  templateUrl: 'zona.html',
})
export class ZonaPage {

  zona: Zona;
  orientacion: string;
  basuras: Basura[] = [];
  basurasDeZona: Basura[] = [];
  historicoBasuras: Basura[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _basuraProv:BasuraProvider) {
              if( this.navParams.get("zona")){
                this.zona = this.navParams.get("zona");
              }
  }

  ionViewDidLoad(){
    this._basuraProv.listarBasuras()
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
          imgContenedor: basura.payload.doc.data().imgContenedor,
          numeroContenedor: basura.payload.doc.data().numeroContenedor,
          codigoContenedor: basura.payload.doc.data().codigoContenedor,
          key: basura.payload.doc.id
        }
      });
      this.mostrarBasuras(); 
    });
  }

  irBasura( basura: Basura ){
    this.navCtrl.push( BasuraPage, { 'basura': basura } );
  }

  calificar( basura: Basura ) {
    this.navCtrl.push( CalificaPage, { 'basura': basura } );
  }

  // listado historico
  listadoHistorico(){
    this._basuraProv.listarHistorico()
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
      this.rellenarHistoricoBasura(); 
    });
  }

  rellenarHistoricoBasura(){
    this.historicoBasuras.forEach( basura => {
      
    })
  }


  // rellenar el array con la zona pulsada para que se puedan listar los contenedores de esa zona
  mostrarBasuras(){
    this.basuras.forEach( basura => {
      if( basura.zona === this.zona.nombre + ' - ' + this.zona.area ){
        this.basurasDeZona.push(basura);
      }
    });    
  }

}
