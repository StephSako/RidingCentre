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
import { RepriseCreateComponent } from './reprise-create/reprise-create.component';
import {ChevalInstructorComponent} from './cheval-instructor/cheval-instructor.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'home-instructor', component: HomeInstructorComponent, canActivate: [AuthGuardService] },
  { path: 'cheval-instructor', component: ChevalInstructorComponent, canActivate: [AuthGuardService] },
  { path: 'reprise/:id', component: RepriseComponent },
  { path: 'new/reprise', component: RepriseCreateComponent },
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
