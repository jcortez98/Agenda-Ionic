import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    private headers:Headers;
    private url:string;

  constructor( private http:Http) {  
      this.url = "http://localhost:3000";
      let config = {
          'Content-Type': 'application/json'
      }
      this.headers = new Headers(config);
  }

  public autenticar(usuario:any){
      let uri = `${this.url}/api/usuario/autenticar/`;
      let data = JSON.stringify(usuario);
      return this.http.post(uri,data,{headers: this.headers}).map(res => {
          if (res.json().token){
              this.setToken(res.json().token);
              localStorage.setItem('idUsuario',res.json().idUsuario)
          }
          return res.json();
      });
  }

  private setToken(token: string){
    localStorage.setItem('TOKEN', token);
  }
  
  public getToken():string{
      return localStorage.getItem('TOKEN')
  }

}