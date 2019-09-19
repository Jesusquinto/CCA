import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';


import { AprendizLayoutRoutes } from "./aprendiz-layout.routing";
import { ConstanciasComponent } from "../../pages/constancias/constancias.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { PefilAprendizComponent } from "../../pages/perfil-aprendiz/perfil-aprendiz.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { VerConstaciasComponent } from 'src/app/pages/constancias/ver-constancias/ver-constancias.component';
import { CrearConstaciasComponent } from 'src/app/pages/constancias/crear-constancias/crear-constancias.component';
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
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AprendizLayoutRoutes),
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
    CrearConstaciasComponent,
    VerConstaciasComponent,
    ConstanciasComponent,
    PefilAprendizComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    ShowImageComponent
    // RtlComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
  ],
  entryComponents:[ShowImageComponent]

})
export class AprendizLayoutModule {}
