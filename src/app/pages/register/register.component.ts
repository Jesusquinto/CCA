import Chart from 'chart.js';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { matchingPasswords, numberLimits } from '../../components/validators/app-validators';
import { trigger, style, transition, animate, keyframes, query, stagger, group, state, animateChild } from '@angular/animations';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: "app-register",
  templateUrl: "register.component.html",
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('300ms', style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
      ]
    )
  ],
  styleUrls: ["register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public datos: FormGroup;
  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  public nodos: any;
  public fichas: any;

  constructor(private _formBuilder: FormBuilder, private servicio: AppService, private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) {

  }




  getFichas(e) {
    this.spinner.show();
    this.datos.controls['ficha'].setValue(null);
    this.servicio.getFichasByNodo(this.datos.controls['nodo'].value).subscribe(result => { this.fichas = result, this.spinner.hide() });
  }

  ngOnInit() {
    this.spinner.show();
    this.servicio.getNodos().subscribe(result => { this.nodos = result, this.spinner.hide() })
    this.datos = this._formBuilder.group({
      'nombre': ['', Validators.compose([Validators.required, Validators.maxLength(65)])],
      'apellido': ['', Validators.compose([Validators.required, Validators.maxLength(65)])],
      'email': ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(255)])],
      'tipoid': ['CC', Validators.compose([Validators.required])],
      'id': ['', Validators.compose([Validators.required, numberLimits({ "max": '11' })])],
      'password': ['', Validators.compose([Validators.required])],
      'repeatpassword': ['', Validators.compose([Validators.required])],
      'nodo': [null, Validators.compose([Validators.required])],
      'ficha': [null, Validators.compose([Validators.required])],
    }, { validator: matchingPasswords('password', 'repeatpassword') });
  }


  registrar() {

    if (this.datos.valid) {
      let datos = {
        "nombre": this.datos.controls['nombre'].value,
        "apellido": this.datos.controls['apellido'].value,
        "identificacion": this.datos.controls['id'].value,
        "tipo_identificacion": this.datos.controls['tipoid'].value,
        "email": this.datos.controls['email'].value,
        "password": this.datos.controls['password'].value,
        "ficha": this.datos.controls['ficha'].value
      }

      this.spinner.show();
      this.servicio.registro(datos).subscribe(
        (result: any) => { this.Toast.fire({ type: 'success', title: `Usuario creado correctamene` }); this.router.navigate(['/login']); this.spinner.hide() },
        error => { this.Toast.fire({ type: 'error', title: error.error.error.message }), this.spinner.hide() }

      );
    } else {
      this.Toast.fire({ type: 'error', title: 'Resvise los campos' });
      Object.keys(this.datos.controls).forEach(controlName => this.datos.controls[controlName].markAsTouched());

    }
  }


}