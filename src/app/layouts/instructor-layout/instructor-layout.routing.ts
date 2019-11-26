import { Routes } from "@angular/router";

import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { AorendicesInstructorComponent } from "../../pages/aprendices-instructor/aprendices-instructor.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ConstanciasInstructoresComponent } from 'src/app/pages/constancias -instructores/constancias-instructores.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const InstructorLayoutRoutes: Routes = [

  { path: "constancias-aprendices", component: ConstanciasInstructoresComponent},
  { path: "aprendices", component: AorendicesInstructorComponent}

  // { path: "rtl", component: RtlComponent }
];
