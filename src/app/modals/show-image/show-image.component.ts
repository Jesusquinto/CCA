import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {
  
  public imagen: string;

  constructor(public dialogRef: MatDialogRef<ShowImageComponent>,
    @Inject(MAT_DIALOG_DATA) public Imagen: string){ this.imagen = this.Imagen; }

  ngOnInit() {
    

  }





}
