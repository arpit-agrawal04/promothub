import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { LandingPageComponent } from './openPages/landingPage/landingPage.component';
import { AboutComponent } from './openPages/about/about.component';

export const AppRoutes: Routes = [
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
   {
    path: 'owner',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]}, {
    path: 'delivery',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '',
    component: LandingPageComponent
  },
  { path: 'about',
  component: AboutComponent
}

]
