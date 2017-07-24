import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http'

import { ContactosPage } from '../pages/contactos/contactos';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { TareaPage } from '../pages/tarea/tarea';
import { CitaPage } from '../pages/cita/cita';
import { ContactoFormPage } from '../pages/contactos/contacto-form';
import { TareaFormPage } from '../pages/tarea/tarea-form';
import { CitaFormPage } from '../pages/cita/cita-form';

import { AuthService } from './services/auth.service';
import { ContactoService } from './services/contacto.service'
import { CitaService } from './services/cita.service'
import { TareaService } from './services/tarea.service'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ContactosPage,
    HomePage,
    TabsPage,
    LoginPage,
    TareaPage,
    CitaPage,
    ContactoFormPage,
    TareaFormPage,
    CitaFormPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactosPage,
    HomePage,
    TabsPage,
    LoginPage,
    CitaPage,
    TareaPage,
    ContactoFormPage,
    TareaFormPage,
    CitaFormPage
  ],
  providers: [
    StatusBar,
    AuthService,
    ContactoService,
    CitaService,
    TareaService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
