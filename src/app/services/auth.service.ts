import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  /* tslint:disable-next-line: variable-name */
  public _usuario: Usuario;
  /* tslint:disable-next-line: variable-name */
  public _token: string;

  constructor(private http: HttpClient, private router: Router) { }

  public get usuario(): Usuario {
    if ( this._usuario !== null ) {
      return this._usuario;
    } else if ( this._usuario === null && sessionStorage.getItem('usuario') !== null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if ( this._token != null ) {
      return this._token;
    } else if ( this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
  }


  isTokenExpired(): boolean {
    let token = sessionStorage.getItem('token');
    let payload = this.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
  

  /* tslint:disable-next-line: variable-name */
  guardarUsuario( access_token: string): void {
    // tslint:disable-next-line: prefer-const
    this._token = access_token;
    sessionStorage.setItem('token', access_token);
    let payload = this.obtenerDatosToken(access_token);
    this._usuario = new Usuario();
    this._usuario.id = payload.id;
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.identificacion = payload.identificacion;
    this._usuario.tipo_identificacion = payload.tipo_identificacion;
    this._usuario.rol  = payload.rol;
    this._usuario.fichas = payload.fichas;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
    switch (payload.rol) {
      case 1:
      this.router.navigate(['dashboard']);

      break;

      case 3:
          this.router.navigate(['constancias']);

        break;
      case 2:
          this.router.navigate(['constancias-aprendices']);
        break;
      default:
        break;
    }
    
  }


  /* tslint:disable-next-line: variable-name */
  obtenerDatosToken( access_token: string): any {
    if (access_token != null) {
      return JSON.parse(atob(access_token.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    // tslint:disable-next-line: prefer-const
    let token = sessionStorage.getItem('token');
    let payload = this.obtenerDatosToken(token);
    if (payload != null && payload.email && payload.email.length > 0) {
      return true;
    }
    return false;
  }

/*   hasRole(role: any): boolean {
    if (this.usuario != null && this.usuario.roles != null && this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  } */

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  obtenerDatosUser() {
    if ( sessionStorage.getItem('usuario') !== null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }


}