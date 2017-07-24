import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {AuthService } from './auth.service'

@Injectable()
export class CitaService {
    private headers:Headers;
    uri = 'http://localhost:3000/api/cita/';
  
  constructor(private http: Http,private auth:AuthService) {}
  getCitas() {
    let usuario = localStorage.getItem('idUsuario')
    let uri2 = this.uri+'user/'+ usuario;
    return this.http.get(uri2).map(response=>{
            return response.json();
      });
  }

  addCita(data:any){
    let json = JSON.stringify(data);
    let final = JSON.parse(json);
    console.log(json);
    return this.http.post(this.uri,final).map(res => {
      return res.json();
    });
  }

  updateCita(data:any){
    let json = JSON.parse(JSON.stringify(data));
    return this.http.put(this.uri+data.idContacto, json).map(res => {
      return res.json();
    });
  }

  eliminarCita(id:any){
    return this.http.delete(this.uri+id).map(res => {
      return res.json();
    });
  }

  getPrioridades(){
    return this.http.get('http://localhost:3000/api/prioridad/').map(res => {
      return res.json();
    });
  }

  buscarCita(id:any){
    return this.http.get(this.uri+id).map(res =>{
      return res.json();
    })
  }
}