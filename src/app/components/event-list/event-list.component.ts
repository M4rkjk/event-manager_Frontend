import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { EventModel } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
  events: EventModel[] = [];
  errorMessage = '';

  //Edit
  isEditModalOpen = false;
  selectedEvent: EventModel | null = null;

  //Delete
  isDeleteModalOpen = false;
  eventToDelete: EventModel | null = null;

  //Create
  isCreateModalOpen = false;
  newEvent = {
    title: '',
    occurs_at: '',
    description: '',
  };

  constructor(private dataService: DataService, private eventService: EventService) {}

  ngOnInit(): void {
    this.refreshEvents();
  }

  refreshEvents(): void {
    this.eventService.getEvents().subscribe({
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

    this.eventService.deleteEvent(this.eventToDelete.id).subscribe({
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

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedEvent = null;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  saveChanges() {
    if (!this.selectedEvent) return;

    this.eventService.updateEvent(this.selectedEvent).subscribe({
      next: () => {
        this.closeEditModal();
        this.refreshEvents();
      },
      error: (err) => {
        console.error('Hiba a mentés során:', err);
      },
    });
  }

  openCreateModal() {
    this.newEvent = {
      title: '',
      occurs_at: '',
      description: '',
    };
    this.isCreateModalOpen = true;
  }

  createEvent() {
    this.eventService.createEvent(this.newEvent).subscribe({
      next: () => {
        this.refreshEvents();
        this.closeCreateModal();
      },
      error: (err) => {
        console.error('Hiba esemény létrehozásakor:', err);
      }
    });
}}
