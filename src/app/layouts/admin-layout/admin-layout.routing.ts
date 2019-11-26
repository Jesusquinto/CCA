import { Routes } from "@angular/router";
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { NodosComponent } from 'src/app/pages/nodos/nodos.component';


// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [

  { path: "dashboard", component: DashboardComponent},
  { path: "nodos", component: NodosComponent}


  // { path: "rtl", component: RtlComponent }
];
