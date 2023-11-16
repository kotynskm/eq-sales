import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login-page', component: LoginRegisterComponent },
  {
    path: 'landing-page',
    component: LandingPageComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
