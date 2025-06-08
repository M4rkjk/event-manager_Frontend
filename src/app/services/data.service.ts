import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EventModel } from '../models/event.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.apiUrl}/events`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  updateEvent(event: EventModel): Observable<EventModel> {
    return this.http.put<EventModel>(
      `${this.apiUrl}/events/${event.id}`,
      event,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/events/${id}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  getCurrentUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }
}
