import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';


import { InstructorLayoutRoutes } from "./instructor-layout.routing";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialImports } from 'src/app/imports/material-imports.import';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PipesModule } from 'src/app/pipes/pipes.module';
import {FileUploadModule} from 'primeng/fileupload';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { ShowImageComponent } from 'src/app/modals/show-image/show-image.component';
import { CustomOverlayContainer } from 'src/app/utils/custom-overlay-container';
import { VerConstaciasInstructoresComponent } from 'src/app/pages/constancias -instructores/ver-constancias-instructores/ver-constancias-instructores.component';
import { ConstanciasInstructoresComponent } from 'src/app/pages/constancias -instructores/constancias-instructores.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InstructorLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MaterialImports,
    PerfectScrollbarModule,
    PipesModule,
    FileUploadModule,
    MatDialogModule
  ],
  declarations: [
    VerConstaciasInstructoresComponent,
    ConstanciasInstructoresComponent
    // RtlComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
  ],
  entryComponents:[]

})
export class InstructorLayoutModule {}
