import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {AuthService } from './auth.service'

@Injectable()
export class ContactoService {
    private headers:Headers;
    private url:string;

  constructor( private http:Http, private auth:AuthService) {  
      this.url = "http://localhost:3000/api/contacto/";
      let config = {
          'Content-Type': 'application/json',
          'Authorization': this.auth.getToken()
      }
      this.headers = new Headers(config);
  }
  public getContactos(){
      return this.http.get(this.url+localStorage.getItem('idUsuario'), {headers:this.headers}).map(res => {
          return res.json();
      })
  }
  public addContacto(contacto:any){
      let data = JSON.stringify(contacto);
      return this.http.post(this.url,data,{headers: this.headers}).map(res =>{
          return res.json();
      });
  }
  public updateContacto(contacto:any){
      let data = JSON.parse(JSON.stringify(contacto));
      return this.http.put(this.url+contacto.idContacto,data).map(res =>{
          return res.json();
      })
  }

  public buscarContacto(id:any){
      return this.http.get(this.url+"buscar/"+id).map(res =>{
          return res.json();
      })

  }
  public eliminarContacto(id:any){
      return this.http.delete(this.url+id).map(res => {
          return res.json();
      })
  }
  public getCategorias(){
      return this.http.get('http://localhost:3000/api/categoria/user/'+localStorage.getItem('idUsuario')).map(res =>{
          return res.json();
      })
  }
}