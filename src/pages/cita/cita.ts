import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CitaService } from '../../app/services/cita.service'
import { CitaFormPage } from './cita-form';


/**
 * Generated class for the CitaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cita',
  templateUrl: 'cita.html',
})
export class CitaPage {

  private citas:any[] = [];

  constructor(
    public navCtrl: NavController,
    public service: CitaService
  ) {
    this.inicializar();
  }

  private inicializar() {
    this.service.getCitas()
    .subscribe(contactos => this.citas = contactos);
  }
  ionViewWillEnter(){
    this.inicializar();
  }
  public verForm(parametro) {
    this.navCtrl.push(CitaFormPage, {parametro});
  }

}
