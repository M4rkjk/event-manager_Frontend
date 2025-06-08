import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

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

    createEvent(eventData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/events`, eventData, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
    }
}
