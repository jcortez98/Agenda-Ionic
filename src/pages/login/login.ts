import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { AuthService } from '../../app/services/auth.service'
import { TabsPage } from '../tabs/tabs'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private model:any = {
    nick: 'jcortez',
    contrasena: '123456'
  }
  constructor(public navCtrl: NavController, private toast:ToastController ,private auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  private iniciarSesion(){
    this.auth.autenticar(this.model).subscribe(res =>{
      if (res.estado){
        this.toast.create({
          message: 'Ingreso',
          duration: 2000
        }).present();
        setTimeout( () => {
          this.navCtrl.push(TabsPage);
        },3000);

      }
    })
  }
}
