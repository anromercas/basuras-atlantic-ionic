import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Componentes
import { ToastController } from 'ionic-angular';

// DATA
import { CALIFICACIONES } from '../../data/data.calificaciones';
import { LLENADOS } from '../../data/data.llenado';
import { masOpciones } from '../../data/data.masopciones';

// INTERFACES
import { Basura } from '../../interfaces/basura.interface';
import { Calificacion } from '../../interfaces/calificacion.interface';
import { Llenado } from '../../interfaces/llenado.interface';
import { MasOpc } from '../../interfaces/masOpc.interface';
// import { SubirPage } from '../subir/subir';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { BasuraProvider } from '../../providers/basura/basura';

@Component({
  selector: 'page-califica',
  templateUrl: 'califica.html',
})
export class CalificaPage {

  basura: Basura;
  hayLlenado: boolean = false;
  llenado:number;
  calificacion: number = null;
  observaciones:string = "";
  estado: string;

  // foto principal
  imagenPreview: string = "";
  imagen64: string;

  // foto detalle
  imagenPreviewDetalle: string = "";
  imagen64Detalle: string;

  colorFondo = "";
  fechaHoy = Date();
  imagenNueva = false;

  calificaciones: Calificacion[] = [];
  masOpciones: MasOpc[] = [];
  llenados: Llenado[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private camera: Camera,
              public _cap: CargaArchivoProvider,
              public _basuraProv: BasuraProvider) {
    
    this.calificaciones = CALIFICACIONES;
    this.masOpciones = masOpciones;
    this.llenados = LLENADOS;

    this.basura = this.navParams.get("basura");

    this.calificacion = 5;
    this.estado = '';

    this.masOpciones.forEach( opc => {
      if (opc.nombre == 'Bueno') {
        opc.seleccionado = true;
        opc.color = 'secondary';
        opc.deshabilitado = false;
      } else {
        opc.deshabilitado = true;
        opc.color = '';
        opc.seleccionado = false;
      }
    });

    this.calificaciones.forEach( calificacion => {
      if (calificacion.puntos == 5) {
        calificacion.seleccionado = true;
        calificacion.color = 'secondary';
      } else {
        calificacion.seleccionado = false;
        calificacion.color = '';
      }
    });

    this.llenados.forEach(llenado => {
      if( llenado.color == 'secondary' ){
        llenado.seleccionado = false;
        llenado.color = "";
      }
    });
  }

  fotoDetalle(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagenPreviewDetalle = 'data:image/jpg;base64,' + imageData;
      this.imagen64Detalle = imageData;
     }, (err) => {
      console.log("ERROR EN CAMARA", JSON.stringify(err));
     });
  }

  mostrar_camara(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagenPreview = 'data:image/jpg;base64,' + imageData;
      this.imagen64 = imageData;
      this.imagenNueva = true;
     }, (err) => {
      console.log("ERROR EN CAMARA", JSON.stringify(err));
     });
  }

  guardar_imagen(){

    let fecha = new Date().toISOString();

    let basuraProv: Basura = {
      img: this.imagen64,
      nombre: this.basura.nombre,
      calificacion: this.calificacion,
      llenado: this.llenado,
      estado: this.estado,
      observaciones: this.observaciones,
      zona: this.basura.zona,
      fecha: fecha,
      numeroContenedor: this.basura.numeroContenedor,
      imgContenedor: this.basura.imgContenedor,
      imgDetalle: this.imagen64Detalle,
      key: this.basura.key
    }

    this._cap.cargar_imagen_firebase(basuraProv)
              .then(() =>{
                this.mostrar_error('Formulario Guardado con éxito');
                this.navCtrl.pop();
              })
              .catch((err)=>{
                this.mostrar_error(err);
                this.navCtrl.popToRoot();
              });

  }

  guardar() {
    if( !this.hayLlenado ) {
      console.log('no hay llenado');
      this.mostrar_error('El llenado es obligatorio');

    } else if( this.calificacion < 5 && this.estado == '') {
      console.log('el estado es obligatorio');
      this.mostrar_error('El estado es obligatorio, al ser una calificación menor a 5');
    } else {
      this.llenados.forEach(llenado => {
        if( llenado.seleccionado ){
          llenado.seleccionado = false;
        }
      });
      this.guardar_imagen();
      
    }
  }

  calificar(calificacion: Calificacion ) {
    this.calificaciones.forEach( calificacion => {
      if( calificacion.seleccionado && calificacion.color == 'secondary' ){
        calificacion.seleccionado = false;
        calificacion.color = "";
      }
    });

    calificacion.color="secondary";
    calificacion.seleccionado = true;
    
    if( calificacion.puntos < 5 ){
      this.mostrar_error('La calificación es menor a 5, debe seleccionar un ESTADO');
      this.calificacion = calificacion.puntos;

      this.masOpciones.forEach( opc => {
        if (opc.nombre == 'Bueno') {
          opc.deshabilitado = true;
          opc.seleccionado = false;
          opc.color = '';
        } else {
          opc.deshabilitado = false;
        }
      });
    } else {
      this.calificacion = calificacion.puntos;

      this.masOpciones.forEach( opc => {
        if (opc.nombre == 'Bueno') {
          opc.deshabilitado = false;
          opc.seleccionado = true;
          opc.color = 'secondary';
        } else {
          opc.deshabilitado = true;
          opc.seleccionado = false;
          opc.color = '';
        }
      });
    }
  }

  cambiarEstado( opcion: MasOpc ){
    if( opcion.seleccionado ) {
      this.estado +=  opcion.nombre + ',';
      opcion.color = 'secondary';
    } else {
      this.estado = this.estado.replace(opcion.nombre + ',', '');
      opcion.color = "";
    }
  }

  reiniciar(){
    
    this.calificacion = 5;

    this.llenados.forEach(llenado => {
      if( llenado.seleccionado ){
        llenado.seleccionado = false;
      }
    });
  }

  seleccionar( llenado: any ) {
    if( llenado.seleccionado ){
      llenado.seleccionado = false;
      this.hayLlenado = false;
      llenado.color = "";
      return;
    }

    this.llenados.forEach(llenado => {
      if( llenado.seleccionado && llenado.color == 'secondary' ){
        llenado.seleccionado = false;
        llenado.color = "";
      }
    });

    llenado.seleccionado = true;
    this.hayLlenado = true;
    llenado.color = "secondary";
    this.llenado = llenado.cantidad;
  }

  mostrar_error( mensaje: string ){
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
