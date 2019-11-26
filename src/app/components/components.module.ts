import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ShowErrorsDirective } from './show-errors/show-errors.component';
import { ShowImageComponent } from '../modals/show-image/show-image.component';
@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent,ShowErrorsDirective, ShowImageComponent  ],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, ShowErrorsDirective, ShowImageComponent
  ]
})
export class ComponentsModule {}
