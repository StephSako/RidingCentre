import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatListModule } from '@angular/material/list';
import { HammerModule } from '@angular/platform-browser';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './Services/authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { HomeInstructorComponent } from './home-instructor/home-instructor.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { RepriseComponent } from './reprise/reprise.component';
import { RepriseCreateComponent } from './reprise-create/reprise-create.component';
import { RepriseEditComponent } from './reprise-edit/reprise-edit.component';
import { MenuGestionComponent } from './menu-gestion/menu-gestion.component';
import { ChevalFormComponent } from './cheval-form/cheval-form.component';
import { ChevalInstructorComponent } from './cheval-instructor/cheval-instructor.component';
import { ChevalEditComponent } from './cheval-edit/cheval-edit.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RecuperationPasswordComponent } from './recuperation-password/recuperation-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    HomeInstructorComponent,
    BackOfficeComponent,
    RepriseComponent,
    RepriseCreateComponent,
    RepriseEditComponent,
    MenuGestionComponent,
    ChevalFormComponent,
    ChevalInstructorComponent,
    ChevalEditComponent,
    ProfileFormComponent,
    ProfileEditComponent,
    RecuperationPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatListModule,
    HammerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    DragDropModule,
    MatTooltipModule
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
