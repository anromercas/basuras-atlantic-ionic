import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public _usuarioProvider: UsuarioProvider) {
  }

  ionViewDidLoad() {
    this.slides.paginationType = 'progress';
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  mostrarInput(){
    this.alertCtrl.create({
      title: 'Ingrese el usuario',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Entrar',
          handler: data => {
            this.verificarUsuario( data.username );
          }
        }
      ]
    }).present();

  }

  verificarUsuario( clave: string ){
    let loading = this.loadingCtrl.create({
      content: 'verificando'
    });

    // mostrar loading
    loading.present();

    // verificamos en el servicio si el usuario existe
    this._usuarioProvider.verificaUsuario( clave )
                          .then( existe => {

                          loading.dismiss();

                            if(existe){
                              this.slides.lockSwipes(false);
                              this.slides.freeMode = true;
                              this.slides.slideNext();
                              this.slides.lockSwipes(true);
                              this.slides.freeMode = false;
                            } else {
                              this.alertCtrl.create({
                                title: 'Usuario incorrecto',
                                subTitle: 'Hable con el administrador o pruebe de nuevo',
                                buttons:['Aceptar']
                              }).present();
                            }
                          });
    
  }

  ingresar(){
      this.navCtrl.setRoot(HomePage);
  }



}
