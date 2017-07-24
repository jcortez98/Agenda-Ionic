import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CitaService } from '../../app/services/cita.service';
import { ContactoService } from '../../app/services/contacto.service';
import { CitaPage } from './cita';

@Component({
  selector: 'page-cita-form',
  templateUrl: 'cita-form.html'
})
export class CitaFormPage {
  private accion = true;
  private contactos:any[] = [];
  private model:any = {
    idCita: 0,
    fecha: '',
    lugar: "",
    descripcion: "",
    idContacto: 0,
    idUsuario: localStorage.getItem('idUsuario')
  };
  private parametro:string;
  private encabezado:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public contactoService: ContactoService,
    public citaService: CitaService
  ) {
    this.parametro = this.navParams.get('parametro');
    if(this.parametro != 'nuevo') {
      this.encabezado = "Editar cita";
      this.citaService.buscarCita(this.parametro)
      .subscribe(res => {
        this.model.idCita = res[0].idCita,
        this.model.fecha = res[0].fecha,
        this.model.descripcion = res[0].descripcion,
        this.model.idUsuario = res[0].idUsuario,
        this.model.idContacto = res[0].idContacto,
        this.model.lugar = res[0].lugar;
        console.log(res);

      });
      this.accion = false;
    } else {
      this.encabezado = "Nueva cita";
    }
    this.contactoService.getContactos().subscribe(res =>{
      this.contactos = res;
    })
  }

  public guardar() {
    if (this.accion){
      this.citaService.addCita(this.model)
      .subscribe(res => {
        this.toast.create({
          message: res.mensaje,
          duration: 2000
        }).present();
        if(res.estado) {
          this.navCtrl.getPrevious();
        } else {
            this.model.idCita = 0,
            this.model.fecha = '',
            this.model.descripcion = '',
            this.model.idUsuario = localStorage.getItem('idUsuario'),
            this.model.idContacto = 0,
            this.model.lugar = '';
        }
      });
    }else {
      this.citaService.updateCita(this.model).subscribe(res =>{
        this.toast.create({
          message: res.mensaje,
          duration: 2000
        }).present();
          this.navCtrl.getPrevious();
      });
    }
  }
  public eliminar(){
    this.citaService.eliminarCita(this.model.idCita).subscribe(res =>{
      this.toast.create({
        message: res.mensaje,
        duration: 2000
      }).present();
      this.navCtrl.getPrevious();
    });
  }
}