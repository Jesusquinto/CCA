import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nodos-form',
  templateUrl: './nodos-form.component.html',
  styleUrls: ['./nodos-form.component.scss']
})
export class NodosFormComponent implements OnInit {

  public datos: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NodosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    
    private servicio: AppService) { 
      this.datos = this.formBuilder.group({
        id: [0, Validators.required],
        nombre: ['', Validators.required]
      });
    }

    private markFormGroupTouched(formGroup: FormGroup) {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
          this.markFormGroupTouched(control);
        }
      });
    }

    public fieldValidation(datos: FormGroup, name: any) {
      if (datos.get([name]).invalid && datos.get([name]).touched) {
        return true;
      }
    }

  ngOnInit() {
    if (this.data.tipoForm == 1) {
      console.log(this.data.data);
      this.datos.patchValue({
        id: this.data.data.id,
        nombre: this.data.data.nombre,

      });
    }
  }

  public setNodo() {
    if (this.datos.valid) {
      return {
        ...this.datos.value,
      }
    }
  }





  public crear() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear el NODO?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.servicio.openSpinner();
          this.servicio.post('usuarios', this.setNodo()).subscribe(
            (data: any) => {
              this.servicio.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'El Nodo ' + String(data.nodo.nombre).toUpperCase() + ' Ha sido Creado!',
                timer: 3000, showConfirmButton: false
              });
            },error => {
              this.servicio.closeSpinner();
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      }) 
    }
  }

  public editar() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere editar el Usuario?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.servicio.openSpinner();
          this.servicio.put('usuarios',this.setNodo()).subscribe(
            (data: any) => {
              this.servicio.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'El Nodo ' + String(data.username).toUpperCase() + ' Ha sido Editado!',
                timer: 3000, showConfirmButton: false
              });
            },error => {
              this.servicio.closeSpinner();
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })
    }
  }

  public submit(){
    if(this.datos.valid){
      switch (this.data.tipoForm) {
        case 0:
          this.crear();
          break;
        case 1:
          this.editar();
          break;

        default:
          break;
      }
    }
  }

  public close(tipo: number): void {
    this.dialogRef.close(tipo);
  }

}
