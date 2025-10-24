import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { DailyComponent } from './pages/daily/daily.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'daily', component: DailyComponent },
  {path: 'add', component: AddTransactionComponent},
];
