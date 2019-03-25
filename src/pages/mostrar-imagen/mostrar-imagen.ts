import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Basura } from '../../interfaces/basura.interface';

@Component({
  selector: 'page-mostrar-imagen',
  templateUrl: 'mostrar-imagen.html',
})
export class MostrarImagenPage {

  basura: Basura;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.basura = this.navParams.get('basura');
  }

}
