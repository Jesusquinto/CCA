import { Component, OnInit } from "@angular/core";
import { trigger, style, transition, animate, keyframes, query, stagger, group, state, animateChild } from '@angular/animations';


@Component({
  selector: "app-constancias",
  templateUrl: "constancias.component.html"
})
export class ConstanciasComponent implements OnInit {
  public estado;
  public display :boolean = true;

  constructor() {
    this.estado = 'ver-constancias';
  }

  ngOnInit() {

  }
 
}
