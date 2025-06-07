import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EventListComponent } from './components/event-list/event-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'event-list', component: EventListComponent },
];
