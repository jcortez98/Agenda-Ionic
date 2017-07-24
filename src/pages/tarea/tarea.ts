import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TareaService } from '../../app/services/tarea.service'
import { TareaFormPage } from './tarea-form';

/**
 * Generated class for the TareaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tarea',
  templateUrl: 'tarea.html',
})
export class TareaPage {
  private tareas:any[] = [];

  constructor(
    public navCtrl: NavController,
    public service: TareaService
  ) {
    this.inicializar();
  }
  ionViewWillEnter(){
    this.inicializar();
  }
  private inicializar() {
    this.service.getTareas()
    .subscribe(contactos => this.tareas = contactos);
  }

  public verForm(parametro) {
    this.navCtrl.push(TareaFormPage, {parametro});
  }

}
