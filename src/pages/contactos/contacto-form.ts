import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactoService } from '../../app/services/contacto.service';
import { ContactosPage } from './contactos';

@Component({
  selector: 'page-contacto-form',
  templateUrl: 'contacto-form.html'
})
export class ContactoFormPage {
  private accion = true;
  private contacto:any = {
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    correo: "",
    idContacto: "",
    idCategoria: 0,
    idUsuario: localStorage.getItem('idUsuario'),
    stringFoto: ''
  };
  private categorias:any[] = [];
  private parametro:string;
  private encabezado:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public contactoService: ContactoService
  ) {
    this.parametro = this.navParams.get('parametro');
    if(this.parametro != 'nuevo') {
      this.encabezado = "Editar contacto";
      this.contactoService.buscarContacto(this.parametro)
      .subscribe(contacto => {
        this.contacto.nombre = contacto[0].nombre,
        this.contacto.apellido = contacto[0].apellido,
        this.contacto.direccion = contacto[0].direccion,
        this.contacto.telefono = contacto[0].telefono,
        this.contacto.correo = contacto[0].correo,
        this.contacto.idContacto = contacto[0].idContacto,
        this.contacto.idCategoria = contacto[0].idCategoria;
        this.contacto.stringFoto = contacto[0].stringFoto;
        console.log(contacto);

      });
      this.accion = false;
    } else {
      this.encabezado = "Nuevo Contacto";
    }
    this.contactoService.getCategorias().subscribe(res =>{
      this.categorias = res;
    })
  }

  public guardar() {
    if (this.accion){
      this.contactoService.addContacto(this.contacto)
      .subscribe(res => {
        this.toast.create({
          message: res.mensaje,
          duration: 2000
        }).present();
        if(res.estado) {
          this.navCtrl.getPrevious();
        } else {
          this.contacto.nombre = "";
          this.contacto.apellido = "";
          this.contacto.direccion = "";
          this.contacto.telefono = "";
          this.contacto.idCategoria = 0;
        }
      });
    }else {
      this.contactoService.updateContacto(this.contacto).subscribe(res =>{
        this.toast.create({
          message: res.mensaje,
          duration: 2000
        }).present();
          this.navCtrl.getPrevious();
      });
    }
  }
  public eliminar(){
    this.contactoService.eliminarContacto(this.contacto.idContacto).subscribe(res =>{
      this.toast.create({
        message: res.mensaje,
        duration: 2000
      }).present();
      this.navCtrl.getPrevious();
    });
  }
}