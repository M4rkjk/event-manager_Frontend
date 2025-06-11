import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { PasswordRestoreComponent } from './components/password-restore/password-restore.component';
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'event-list', component: EventListComponent },
  { path: 'forgot-password', component: PasswordRestoreComponent },
  { path: 'restore-password-form', component:PasswordResetFormComponent}
];
