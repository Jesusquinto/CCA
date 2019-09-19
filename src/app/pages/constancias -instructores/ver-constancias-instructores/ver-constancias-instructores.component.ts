import { Component, OnInit, HostListener, ViewChild, Input } from "@angular/core";
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Endpoints } from 'src/app/services/endpoints';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: "app-ver-constancias-instructores",
  templateUrl: "ver-constancias-instructores.component.html",
  styleUrls: ['./ver-constancias-instructores.component.scss']
})
export class VerConstaciasInstructoresComponent implements OnInit {
  public resources: string;
  public uploads: string;
  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  public sidenavOpen:boolean = true;
  public constancias : any;
  public constancia : any;
  public estadoConstancia: any;
  public display: boolean = false;
  public imagen: any = null;
  @Input() public pathway: any;
  @Input() public ficha: any;

  constructor(private servicio: AppService, private spinner: NgxSpinnerService, public dialog: MatDialog) {this.resources = Endpoints.resources, this.uploads = Endpoints.uploads}

/*   openDialog(): void {
    const dialogRef = this.dialog.open(ShowImageComponent, {
      width: '80%',
      data: this.imagen,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  } */


    getConstancias(){

      this.spinner.show();
      this.servicio.get('constancias/instructor/'.concat(this.pathway.id).concat('/'.concat(this.ficha))).subscribe(result =>{this.constancias = result, this.spinner.hide(),
        this.constancias.forEach(e => {
            e.selected = false;
            e.imagenes = JSON.parse(e.imagenes);
        });
      },
        error =>{ this.Toast.fire({ type: 'error', title: error.error.error.message  }), this.spinner.hide()});
    }

    verImagen(imagen){
        this.imagen = imagen;
/*         this.openDialog();
 */        console.log(imagen);



    }



    seleccionarConstancia(c){
      this.constancias.forEach(m => m.selected = false);
      c.selected = true;

      this.constancia = null;
      this.estadoConstancia = "cargando";
      setTimeout(x => {
        this.estadoConstancia = "cargado";
      this.constancia = c;
      }, 300);
  
    }

  ngOnInit() {
  this.getConstancias();

  }


  eliminarConstancia(){
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-default',
        title: 'title2'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: 'Eliminar la constancia con el pathway '.concat(this.constancia.pathway.nombre),
      type: 'info',
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.servicio.get('user/constancia/eliminar/'.concat(this.constancia.id)).subscribe((result :any) =>{this.getConstancias(), this.constancia = null,
          this.Toast.fire({ type: 'success', title: result.success.message})}, error =>{this.Toast.fire({ type: 'error', title: 'Ocurrió un error en la consulta'  })});
      } else {

        
      }
    });










   
  }



  

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }


  
}
