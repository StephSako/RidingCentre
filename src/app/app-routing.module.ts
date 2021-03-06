import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import { HomeInstructorComponent } from './home-instructor/home-instructor.component';
import { RepriseComponent } from './reprise/reprise.component';
import { ChevalInstructorComponent } from './cheval-instructor/cheval-instructor.component';
import { RecuperationPasswordComponent } from './recuperation-password/recuperation-password.component';
import { AdminGestionComponent } from './admin-gestion/admin-gestion.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'home-instructor', component: HomeInstructorComponent, canActivate: [AuthGuardService], data: {roles: [2, 3, 4]} },
  { path: 'cheval-instructor', component: ChevalInstructorComponent, canActivate: [AuthGuardService], data: {roles: [2, 3, 4]} },
  { path: 'reprise/:id_reprise', component: RepriseComponent, canActivate: [AuthGuardService] },
  { path: 'recuperation-mot-de-passe', component: RecuperationPasswordComponent },
  { path: 'reset-mot-de-passe/:email_user', component: ResetPasswordComponent },
  { path: 'admin-gestion', component: AdminGestionComponent, canActivate: [AuthGuardService], data: {roles: [3, 4]} },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
