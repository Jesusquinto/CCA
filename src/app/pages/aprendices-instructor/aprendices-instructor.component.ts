import { Component, OnInit } from "@angular/core";
import { AppService } from 'src/app/services/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: "app-aprendices-instructor",
  templateUrl: "aprendices-instructor.component.html",
  styleUrls: ['aprendices-instructor.component.scss']
})
export class AorendicesInstructorComponent implements OnInit {
  public idFicha: any;
  public data: any;

  
  public fichas: Array<any>;
  public fichaCtrl: any;
  public fichaFilterCtrl: any;


  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  public swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-default',
      cancelButton : 'btn btn-warning',
      title: 'title2'
    },
    buttonsStyling: false,
  });
  

  constructor(private servicio: AppService, private spinner: NgxSpinnerService) { this.idFicha = 1; this.fichaFilterCtrl = ''}

  ngOnInit() {

    this.getFichas();

  }


  getFichas(){
    this.spinner.show();
    this.servicio.get('instructor/fichas').subscribe(
      (result: any) => {this.spinner.hide();
        let fichas : Array<any> = new Array();
        result.forEach(e => {
          fichas.push(e.ficha);
        });
        this.fichas = fichas;
        this.fichaCtrl = this.fichas[0];
        this.getAprendices();
        console.log(this.fichas)
      },
      error => { this.Toast.fire({ type: 'error', title: error.error.error.message }), this.spinner.hide() }
    );
  }

  getAprendices(){
    this.spinner.show();
    this.servicio.get('aprendices/ficha/'.concat(this.fichaCtrl.id)).subscribe(
      result => {this.spinner.hide(), console.log(result), this.data = result},
      error => {this.spinner.hide(), console.log(error)}
    )
  }


  estadoAprendiz(aprendiz){
  
    this.swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: 'De cambiar el estado al aprendiz '.concat(aprendiz.usuario.nombre) + " ".concat(aprendiz.usuario.apellido) + "?",
      type: 'info',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'cancelar',
      reverseButtons: true,
      showConfirmButton: true,
      showCancelButton: true
      
    }).then((result) => {
      if (result.value) {
        
    this.spinner.show();
    this.servicio.put('aprendices/estado/'.concat(aprendiz.id), null).subscribe(
      (result : any) => {this.spinner.hide(), this.Toast.fire({ type: 'success', title: result.message }), this.getAprendices(); },
      error => {this.spinner.hide(), console.log(error) }
    ) 
      } else {

        
      }
    });

  }





}
