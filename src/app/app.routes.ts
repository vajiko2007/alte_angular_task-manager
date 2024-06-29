import {Routes} from '@angular/router';
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {MainComponent} from "./main/main.component";
import {ProjectsComponent} from "./projects/projects/projects.component";

export const routes: Routes = [
  {
    path:"",
    component: MainComponent
  },

  {
    path: "register",
    component: RegisterComponent
  },

  {
    path: "login",
    component: LoginComponent
  },

  {
    canActivate: [() => !!localStorage.getItem('accessToken')],
    path:"projects",
    component: ProjectsComponent
  }
];
