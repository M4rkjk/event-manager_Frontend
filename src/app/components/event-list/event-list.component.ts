import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { EventModel } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  events: EventModel[] = [];
  isEditModalOpen = false;
  selectedEvent: EventModel | null = null;

  isDeleteModalOpen = false;
  eventToDelete: EventModel | null = null;

  errorMessage = '';

  constructor(private dataService: DataService, router: ActivatedRoute) {}

  ngOnInit(): void {
    this.refreshEvents();
  }

  refreshEvents(): void {
    this.dataService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load events.';
        console.error(err);
      },
    });
  }

  editEvent(event: EventModel) {
    this.selectedEvent = { ...event };
    this.isEditModalOpen = true;
  }

  deleteEvent(event: EventModel) {
    this.eventToDelete = event;
    this.isDeleteModalOpen = true;
  }

  confirmDelete() {
    if (!this.eventToDelete) return;

    this.dataService.deleteEvent(this.eventToDelete.id).subscribe({
      next: () => {
        this.refreshEvents();
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error('Hiba a törlés során:', err);
        this.errorMessage = 'Failed to delete event.';
      },
    });
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.eventToDelete = null;
  }

  closeModal() {
    this.isEditModalOpen = false;
    this.selectedEvent = null;
  }

  saveChanges() {
    if (!this.selectedEvent) return;

    this.dataService.updateEvent(this.selectedEvent).subscribe({
      next: () => {
        this.closeModal();
        this.refreshEvents();
      },
      error: (err) => {
        console.error('Hiba a mentés során:', err);
      },
    });
  }
}
