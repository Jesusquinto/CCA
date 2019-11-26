import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AprendizLayoutComponent } from "./layouts/aprendiz-layout/aprendiz-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginGuard } from './guards/login.guard';
import { AprendizGuard } from './guards/aprendiz.guard';
import { InstructorLayoutComponent } from './layouts/instructor-layout/instructor-layout.component';
import { InstructorGuard } from './guards/instructor.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },

  //APRENDIZ
  {
    path: "",
    component: AprendizLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/aprendiz-layout/aprendiz-layout.module#AprendizLayoutModule"
      }
    ],
    canActivate: [AprendizGuard]
  }, 
  //AUTH  
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ],
    canActivate: [LoginGuard]
  },
  //INSTRUCTOR
  {
    path: '',
    component: InstructorLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/instructor-layout/instructor-layout.module#InstructorLayoutModule'
      }
    ],
    canActivate: [InstructorGuard]
  },

  //ADMIN
//INSTRUCTOR
{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }
  ],
  canActivate: [AdminGuard]
},


  //DEFAULT
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
