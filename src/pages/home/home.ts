import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ZONAS } from '../../data/data.zonas';
import { Zona } from '../../interfaces/zona.interface';

import { NavController, App } from 'ionic-angular';
import { ZonaPage } from '../index.paginas';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  zonas: Zona[] = [];
  orientation: string;

  constructor( public navCtrl: NavController,
                public _usarioProv: UsuarioProvider,
                private screenOrientation: ScreenOrientation,
                private appCtrl: App ) {
  
                  this.orientation = this.screenOrientation.type;
                      this.screenOrientation.onChange().subscribe(
                        ()=>{
                          this.orientation = this.screenOrientation.type;
                         if(this.navCtrl.getActive().component === HomePage){
                           this.appCtrl.getRootNav().setRoot(HomePage);
                         }
                        }
                      )


    this.zonas = ZONAS.slice(0);

  }


  irZona( zona: Zona ) {
    this.navCtrl.push( ZonaPage, { 'zona': zona } );
  }

  cerrar_sesion(){
    this._usarioProv.borrarStorage();
    this.navCtrl.push(LoginPage);
    this.navCtrl.remove(0);
  }

}



