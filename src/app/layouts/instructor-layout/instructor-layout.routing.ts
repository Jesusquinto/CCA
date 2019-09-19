import { Routes } from "@angular/router";

import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ConstanciasInstructoresComponent } from 'src/app/pages/constancias -instructores/constancias-instructores.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const InstructorLayoutRoutes: Routes = [

  { path: "constancias-aprendices", component: ConstanciasInstructoresComponent},

  // { path: "rtl", component: RtlComponent }
];
