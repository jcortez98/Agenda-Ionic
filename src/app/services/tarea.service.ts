import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {AuthService } from './auth.service'

@Injectable()
export class TareaService {
    private headers:Headers;
    uri = 'http://localhost:3000/api/tarea/';
  
  constructor(private http: Http,private auth:AuthService) {
      let config = {
          'Content-Type': 'application/json',
          'Authorization': this.auth.getToken()
      }
      this.headers = new Headers(config);
  }
  getTareas() {
    let usuario = localStorage.getItem('idUsuario')
    let uri2 = this.uri + usuario;
    return this.http.get(uri2).map(response=>{
            return response.json();
      });
  }
  getPrioridades(){
    return this.http.get('http://localhost:3000/api/prioridad/').map(response => {
      return response.json();
    })
  }

  addTarea(data:any){
    let json = JSON.stringify(data);
    let final = JSON.parse(json);
    console.log(json);
    return this.http.post(this.uri,final).map(res => {
      return res.json();
    });
  }

  updateTarea(data:any){
    let json = JSON.parse(JSON.stringify(data));
    return this.http.put(this.uri+data.idTarea, json).map(res => {
      return res.json();
    });
  }

  eliminarTarea(id:any){
    return this.http.delete(this.uri+id).map(res => {
      return res.json();
    });
  }
  
  buscarTarea(id:any){
    return this.http.get(this.uri+'buscar/'+id).map(res =>{
      return res.json();
    })
  }
}