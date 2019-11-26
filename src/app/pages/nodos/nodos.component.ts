import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from 'src/app/services/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { NodosFormComponent } from './nodos-form/nodos-form.component';

@Component({
  selector: "app-nodos",
  templateUrl: "nodos.component.html",
  styleUrls: ['nodos.component.scss']
})
export class NodosComponent implements OnInit {

  public nodos: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'nombre', 'estado'];
  public dataSource: any;
  public itemSelected: any;


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
  

  constructor(private servicio: AppService, private spinner: NgxSpinnerService,  public dialog: MatDialog) { }

  ngOnInit() {

   this.getNodos();

  }



  public getNodos() {
    this.servicio.get('nodos').subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {  }
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage()}
  }

  public nuevo() { this.itemSelected = null; this.openForm(0)}
  public openForm(tipoForm: number) {
    const dialogRef = this.dialog.open(NodosFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: 'auto', maxWidth: '60%', height: 'auto', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getNodos()}});
  }
 
/*   public editar(item: any) { this.itemSelected = item;this.openForm(1)}
 */


  public setEstado(data: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere cambiar el estado del nodo?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, cambiar',
      confirmButtonClass: 'btn btn-info',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.servicio.put('nodos/estado/'.concat(data.id), null).subscribe(
          (result: any) => {
            this.spinner.hide();
            Swal.fire({
              type: 'success', text: 'El estado del nodo ' + String(data.nombre).toUpperCase() + ' Ha sido Editado!',
              timer: 3000, showConfirmButton: false
            });
            this.getNodos()
          },error => {
            console.log(error);
            this.spinner.hide();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }



  
  
  





}
