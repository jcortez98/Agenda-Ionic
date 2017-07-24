import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CitaService } from '../../app/services/cita.service';
import { TareaService } from '../../app/services/tarea.service'
import { ContactoService } from '../../app/services/contacto.service';
import { TareaPage } from './tarea';

@Component({
  selector: 'page-tarea-form',
  templateUrl: 'tarea-form.html'
})
export class TareaFormPage {
  private accion = true;
  private model:any = {
    fecha: "",
    nombre: "",
    descripcion: "",
    idCategoria: 0,
    idPrioridad: 0,
    idTarea: 0,
    idUsuario: localStorage.getItem('idUsuario')
  };
  private categorias:any[] = [];
  private prioridades:any[] = [];
  private parametro:string;
  private encabezado:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public contactoService: ContactoService,
    public tareaService: TareaService,
    public citaService: CitaService
  ) {
    this.parametro = this.navParams.get('parametro');
    if(this.parametro != 'nuevo') {
      this.encabezado = "Editar tarea";
      this.tareaService.buscarTarea(this.parametro)
      .subscribe(contacto => {
        this.model.idTarea = contacto[0].idTarea;
        this.model.fecha = contacto[0].fecha;
        this.model.nombre = contacto[0].nombre;
        this.model.descripcion = contacto[0].descripcion;
        this.model.idCategoria = contacto[0].idCategoria;
        this.model.idPrioridad = contacto[0].idPrioridad;
        console.log(contacto);

      });
      this.accion = false;
    } else {
      this.encabezado = "Nueva tarea";
    }
    this.contactoService.getCategorias().subscribe(res =>{
      this.categorias = res;
    })
    this.citaService.getPrioridades().subscribe(res =>{
        this.prioridades = res;
    })
  }

  public guardar() {
    if (this.accion){
      this.tareaService.addTarea(this.model)
      .subscribe(res => {
        this.toast.create({
          message: res.mensaje,
          duration: 2000
        }).present();
        if(res.estado) {
          this.navCtrl.popTo(TareaPage);
        } else {
          this.model.fecha = '';
        this.model.nombre = '';
        this.model.descripcion = '';
        this.model.idCategoria = 0;
        this.model.idPrioridad = 0;
        }
      });
    }else {
      this.tareaService.updateTarea(this.model).subscribe(res =>{
        this.toast.create({
          message: res.mensaje,
          duration: 2000
        }).present();
          this.navCtrl.popTo(TareaPage)
      });
    }
  }
  public eliminar(){
    this.tareaService.eliminarTarea(this.model.idTarea).subscribe(res =>{
      this.toast.create({
        message: res.mensaje,
        duration: 2000
      }).present();
      this.navCtrl.popTo(TareaPage);
    });
  }
}