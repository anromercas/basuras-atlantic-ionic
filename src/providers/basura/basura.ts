import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Basura } from '../../interfaces/basura.interface';

@Injectable()
export class BasuraProvider {

  constructor(private afDB: AngularFirestore) {
  }

  crearBasura( basura: Basura ){
    return this.afDB.collection('basuras').add(basura);
  }

  obtenerBasura( id: string ) {
    return this.afDB.collection('basuras').doc(id).snapshotChanges();
  }

  actualizarBasura( id: string, basura: Basura ){
    return this.afDB.collection('basuras').doc(id).set(basura);
  }

  borrarBasura( id: string ){
    return this.afDB.collection('basuras').doc(id).delete();
  }

  recargarBasuras(){
    return new Promise( (resolve, reject) => {
      this.afDB.collection('basuras')
                .valueChanges()
                .subscribe(
                  data => {
                    resolve(data);
                  }, 
                  err => reject(err)
                );
    });
  }

  listarBasuras(){

    return this.afDB.collection('basuras', ref => ref.orderBy('numeroContenedor')).snapshotChanges();
  }

  listarHistorico(){
    return this.afDB.collection('historicos', ref => ref.orderBy('fecha', 'desc')).snapshotChanges();
  }

}
