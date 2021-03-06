import { Component, OnInit } from "@angular/core";
import { trigger, style, transition, animate, keyframes, query, stagger, group, state, animateChild } from '@angular/animations';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { Endpoints } from 'src/app/services/endpoints';



@Component({
  selector: "app-constancias-instructores",
  templateUrl: "constancias-instructores.component.html",
  styleUrls: ['./constancias-instructores.component.scss']
})
export class ConstanciasInstructoresComponent implements OnInit {
  public estado : string;
  public display :boolean = true;
  public pathways:any;
  public pathwaySelected: any;



  public fichas: Array<any>;
  public fichaCtrl: any;
  public fichaFilterCtrl: any;




  public ruta: any;
  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });



  getFichas(){
    this.spinner.show();
    this.servicio.get('instructor/fichas').subscribe(
      (result: any) => {this.spinner.hide();
        let fichas : Array<any> = new Array();
        result.forEach(e => {
          fichas.push(e.ficha);
        });
        this.fichas = fichas;
        console.log(this.fichas)
      },
      error => { this.Toast.fire({ type: 'error', title: error.error.error.message }), this.spinner.hide() }
    );
  }





  getPathways(){
    this.spinner.show();
    this.servicio.get('pathways').subscribe(
      (result: any) => { this.pathways = result, this.spinner.hide(),     this.estado = 'seleccionar-pathway';},
      error => { this.Toast.fire({ type: 'error', title: error.error.error.message }), this.spinner.hide() }

    );
  }

  selectPathway(e){
    this.estado = 'ver-constancias';
    this.pathwaySelected = e;
    console.log(e);

  }



  constructor(private servicio: AppService, private authService: AuthService, private router: Router, private spinner: NgxSpinnerService) {
    this.estado = 'seleccionar-ficha';
    this.ruta = Endpoints.resources;
    this.fichaFilterCtrl = '';

  }

  ngOnInit() {
    this.getFichas();
  
  }
 
}
