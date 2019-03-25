import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

import { Storage } from '@ionic/storage';


@Injectable()
export class UsuarioProvider {

  clave:string;
  user:any = {};

  constructor(private afDB: AngularFirestore,
              private platform: Platform,
              private storage: Storage) {
    
  }

  verificaUsuario( clave: string ){

    clave = clave.toLowerCase();

    return new Promise( (resolve, reject) => {

      this.afDB.doc(`/usuarios/${ clave }`)
                .valueChanges()
                .subscribe( data => {
                  if(data){
                    // correcto
                    this.clave = clave;
                    this.user = data;
                    this.guardarStorage();
                    resolve(true);
                  } else {
                    // incorrecto
                    resolve(false);
                  }
                });

    });
  }

  borrarStorage(){
    if(this.platform.is('corodova')){
      this.storage.remove('clave');
    } else {
      localStorage.removeItem('clave');
    }
  }

  guardarStorage(){
    if(this.platform.is('corodova')){
      this.storage.set('clave', this.clave);
    } else {
      localStorage.setItem('clave', this.clave);
    }
  }

  cargarStorage() {
    return new Promise( (resolve, reject) =>{
      if(this.platform.is('corodova')){

        this.storage.get('clave').then( val => {

          if( val ) {
            this.clave = val;
            resolve(true);
          } else {
            resolve(false);
          }

        });
        
      } else {
        if( localStorage.getItem('clave') ) {
          this.clave = localStorage.getItem('clave');
          resolve(true);
        } else {
          resolve(false);
        }
      }
    })
  }

}
