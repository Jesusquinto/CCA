import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AprendizGuard implements CanActivate, OnInit {

  public usuario: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.auth.isAuthenticated()) {
        if (this.isTokenExpired()) {
          this.auth.logout();
          this.router.navigate(['/login']);
          return false;
        }

        if(this.isAprendiz()){
          return true;
        }
      }
      this.router.navigate(['/login']);
      return false;
    }



    isAprendiz(): boolean {
      let token = sessionStorage.getItem('token');
      let payload = this.auth.obtenerDatosToken(token);
      if(payload.rol == 3){
        return true; 
      }
      return false;
    }



  isTokenExpired(): boolean {
    let token = sessionStorage.getItem('token');
    let payload = this.auth.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
}