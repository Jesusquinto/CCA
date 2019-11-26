import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { Endpoints } from './endpoints';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
}) 
export class AppService {


  public url : any;
 private token = '';
 private httpOptions;
 
 constructor(private http: HttpClient, private auth: AuthService, private router : Router, private spinner: NgxSpinnerService)
 {
   this.url = Endpoints.normal;
  this.getHeaders(); 
 }


 getHeaders(){
  this.token = sessionStorage.getItem('token');
  this.httpOptions = {headers: new HttpHeaders({  'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + this.token})};
 }

 getHeaders2(){
  this.token = sessionStorage.getItem('token');
  this.httpOptions = {headers: new HttpHeaders('multipart/*').append('Authorization', 'Bearer '+ this.token)};
 }





 clearSession(){
  this.auth.logout();
  swal.fire({
    title: 'Error!',
    text: 'Su sesion ha expirado',
    type: 'error'
  });
  this.spinner.hide();
  this.router.navigate(['/login']);
 }  



 //GET
  get(ruta:string)
  {
    if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired(); if(!exp){ this.getHeaders();return this.http.get<any>(this.url.concat(ruta),this.httpOptions);} } 
    this.clearSession();
  }

  //POST
 post(ruta: string, body: any)
 {
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired(); if(!exp){this.getHeaders();return this.http.post<any>(this.url.concat(ruta), body, this.httpOptions); }}
  this.clearSession();
 }

 //DELETE
 delete(ruta: string)
 {
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired();if(!exp){ this.getHeaders(); return this.http.delete<any>(this.url.concat(ruta), this.httpOptions);}}
  this.clearSession();
 }

 //PUT
 put(ruta: string, body: any)
 { 
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired();if(!exp){this.getHeaders();return this.http.put<any>(this.url.concat(ruta), body, this.httpOptions);}}
  this.clearSession();
 }




 login(usuario: Usuario): Observable<any> {
  let httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
  });
  return this.http.post<any>(this.url.concat('login'), usuario, {headers: httpHeaders});
}

registro(usuario) {
  let httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
  });
  return this.http.post<any>(this.url.concat('crearusuarios'), usuario, {headers: httpHeaders});
}

getNodos(){
  let httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
  });
  return this.http.get<any>(this.url.concat('nodos'), {headers: httpHeaders})
}

getFichasByNodo(nodoId){
  let httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
  });
  return this.http.get<any>(this.url.concat('fichas/nodo/'.concat(nodoId)), {headers: httpHeaders});
}


public openSpinner() { this.spinner.show(); }
public closeSpinner() { this.spinner.hide(); }

crearConstancia(data: FormData ){
  this.getHeaders2();
  if(this.auth.isAuthenticated()){let exp = this.auth.isTokenExpired();if(!exp){return this.http.post(`${this.url}user/crearconstancia`, data, this.httpOptions);}}
  this.clearSession();
}




}