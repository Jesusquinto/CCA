import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AprendizLayoutComponent } from "./layouts/aprendiz-layout/aprendiz-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule, routes } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";

import { NgxSpinnerModule } from "ngx-spinner";
import { InstructorLayoutComponent } from './layouts/instructor-layout/instructor-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule.forRoot(routes,{
      useHash: false
    }),
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AprendizLayoutComponent, AuthLayoutComponent, InstructorLayoutComponent, AdminLayoutComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
