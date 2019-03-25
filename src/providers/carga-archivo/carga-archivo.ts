import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { Basura } from '../../interfaces/basura.interface';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class CargaArchivoProvider {

  constructor( public toastCtrl: ToastController,
                private afDB: AngularFirestore ) {
   
  }

  cargar_imagen_firebase( basura: Basura ){

    let promesa = new Promise( (resolve,reject)=> {
      this.mostrar_toast('Cargando...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString();
      let nombreArchivoDetalle: string = new Date().valueOf().toString() + '-Detalle';

      let uploadTaskDetalle: firebase.storage.UploadTask = 
                    storeRef.child(`img/${ nombreArchivoDetalle }`)
                    .putString( basura.imgDetalle, 'base64', { contentType: 'image/jpeg' });

      let uploadTask: firebase.storage.UploadTask = 
          storeRef.child(`img/${ nombreArchivo }`)
                  .putString( basura.img, 'base64', { contentType: 'image/jpeg' } );

          uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
              () => {  }, // SABER EL % DE CUANTOS Mbs SE HAN SUBIDO
              ( error ) => {
                // Manejo de error
                console.log("ERROR EN LA CARGA");
                console.log(JSON.stringify( error ));
                this.mostrar_toast("Error en la carga de la imagen - Revise su conexión a internet");
                reject();
              },
              () => {
                // TODO BIEN!!!
                uploadTaskDetalle.on( firebase.storage.TaskEvent.STATE_CHANGED,
                  () => {},
                  ( error ) => {
                    // Manejo de error
                    console.log("ERROR EN LA CARGA");
                    console.log(JSON.stringify( error ));
                    this.mostrar_toast("Error en la carga de la imagen Detalle - Revise su conexión a internet");
                    reject();
                  },
                  () => {
                    console.log('Archivo Subido');
                    this.mostrar_toast('Imagen cargada correctamente');
                    
                    uploadTask.then((snapshot) => {
                      snapshot.ref.getDownloadURL().then((url) => {
                        
                        uploadTaskDetalle.then((snapshotDetalle) =>{
                          snapshotDetalle.ref.getDownloadURL().then((urlDetalle) => {
                            this.crear_basura(basura, url, urlDetalle, nombreArchivo );

                          });
                        });

                      });
                    });

                  }
                )
                resolve();
              });

    });
    return promesa;
  }

  private crear_basura( basura: Basura, url: string, urlDetalle: string, nombreArchivo: string ){
    let basuraProv: Basura = {
      nombre: basura.nombre,
      zona: basura.zona,
      img: url,
      calificacion: basura.calificacion,
      llenado: basura.llenado,
      estado: basura.estado,
      observaciones: basura.observaciones,
      fecha: basura.fecha,
      numeroContenedor: basura.numeroContenedor,
      imgContenedor: basura.imgContenedor,
      imgDetalle: urlDetalle,
      id: nombreArchivo,
      key: basura.key
    };

    console.log(JSON.stringify(basuraProv));
    this.modificar_basura(basuraProv);
    this.añadir_historico(basuraProv);

  }

  modificar_basura(basura: Basura){
    this.afDB.collection('basuras').doc(basura.key).set(basura);
  }

  añadir_historico( basuraProv: Basura ){
    return new Promise((resolve,reject)=>{

      this.afDB.collection('/historicos')
                .add(basuraProv)
                .then( (res) => {
                  console.log(res);
                  resolve(res)
                }, err => reject(err))
      });
  }

  mostrar_toast( mensaje: string ){
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
