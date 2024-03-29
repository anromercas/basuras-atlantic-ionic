import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

// plugins
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import {  HomePage,
          LoginPage,
          ZonaPage,
          BasuraPage,
          CalificaPage,
          EjemplosPage,
          MostrarImagenPage } from '../pages/index.paginas';

// servicios
import { UsuarioProvider } from '../providers/usuario/usuario';
import { CalificacionProvider } from '../providers/calificacion/calificacion';
import { BasuraProvider } from '../providers/basura/basura';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from '../config/firebase.config';


// modulos 
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// fecha
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ZonaPage,
    BasuraPage,
    CalificaPage,
    EjemplosPage,
    MostrarImagenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFirestoreModule.enablePersistence(), // Guardar datos offline
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ZonaPage,
    BasuraPage,
    CalificaPage,
    EjemplosPage,
    MostrarImagenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AlertController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    CalificacionProvider,
    BasuraProvider,
    CargaArchivoProvider,
    ScreenOrientation,
    {provide: LOCALE_ID, useValue:"es" }
  ]
})
export class AppModule {}
