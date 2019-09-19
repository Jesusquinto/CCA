import { Component, OnInit, ViewChild } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Endpoints } from 'src/app/services/endpoints';
import { MatStepper } from '@angular/material';
import { FileUpload } from 'primeng/fileupload';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: "app-crear-constancias",
  templateUrl: "crear-constancias.component.html",
  styleUrls: ['./crear-constancias.component.scss']
})
export class CrearConstaciasComponent implements OnInit {
  @ViewChild('stepper', {static: false}) stepper : MatStepper;
  @ViewChild('imagenes', {static: false}) selectorImagenes : FileUpload;

  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  public ruta: any;
  public pathways : any;
  public pathway: any;
  public click: any = false;

  public editable = true;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  crearConstancia(){
    if(this.selectorImagenes.files.length > 0 && this.click == false){
      this.click = true;
      this.spinner.show();
      this.secondFormGroup.controls['imagenes'].setValue('Ya hay imagenes');
      let formData = new FormData();
      for (let i = 0; i < this.selectorImagenes.files.length; i++) {
        formData.append('image'.concat(i.toString()), this.selectorImagenes.files[i]);
      }
      formData.append('pathway', this.pathway.id);
      formData.append('descripcion', this.secondFormGroup.controls['descripcion'].value);
          
        this.servicio.crearConstancia(formData).subscribe((result : any) => {this.editable = false, this.Toast.fire({ type: 'success', title: result.success.message }), 
        this.stepper.next(), this.spinner.hide(),this.click = false}, 
                                                            error =>{ this.Toast.fire({ type: 'error', title: error.error.error.message  }), this.spinner.hide(),
                                                                      this.click = false})



    }else{
      this.Toast.fire({ type: 'error', title: "Adjunte las Evidencias fotograficas" });
    }

  }




  selectPathway(e){
    this.pathway = e;
    this.firstFormGroup.controls['pathway'].setValue('Ya hay pathway');
    this.secondFormGroup.controls['descripcion'].setValue('Buenas profesor, le adjunto todas las evidencias correspondientes al pathway '.concat(this.pathway.nombre));
    this.stepper.next();
  }

  constructor(private _formBuilder: FormBuilder, private servicio: AppService, private spinner: NgxSpinnerService) {this.ruta = Endpoints.resources}

  resetStepper(){
    this.stepper.reset();
    this.editable = true;
    this.selectorImagenes.clear();
    this.firstFormGroup.controls['pathway'].setValue('');
    this.secondFormGroup.controls['descripcion'].setValue('');
    this.secondFormGroup.controls['imagenes'].setValue('');
    this.getPathways();
  }



  getPathways(){
    this.spinner.show();
    this.servicio.get('user/pathways').subscribe(result =>{this.pathways = result, this.spinner.hide()},  
      error => { this.Toast.fire({ type: 'error', title: error.error.error.message }), this.spinner.hide() });
  }

  ngOnInit() {
    
    this.getPathways();

      this.firstFormGroup = this._formBuilder.group({
        pathway: ['', Validators.required]
      })

      this.secondFormGroup = this._formBuilder.group({
        descripcion: [''],
        imagenes: [ '', Validators.required]
      });
  }
 
}
