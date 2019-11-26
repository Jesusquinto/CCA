import { Routes } from "@angular/router";

import { ConstanciasComponent } from "../../pages/constancias/constancias.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { PefilAprendizComponent } from "../../pages/perfil-aprendiz/perfil-aprendiz.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AprendizLayoutRoutes: Routes = [
  
  { path: "constancias", component: ConstanciasComponent },
  { path: "perfil", component: PefilAprendizComponent }

  // { path: "rtl", component: RtlComponent }
];
