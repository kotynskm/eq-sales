import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './auth.guard';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';
import { ListingsComponent } from './search/listings/listings.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login-page', component: LoginRegisterComponent },
  {
    path: 'landing-page',
    component: LandingPageComponent,
    canActivate: [authGuard],
  },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [authGuard],
    children: [{ path: 'allhorses', component: ListingsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
