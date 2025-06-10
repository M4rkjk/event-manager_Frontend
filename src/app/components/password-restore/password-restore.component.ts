import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-restore',
  imports: [FormsModule],
  templateUrl: './password-restore.component.html',
  styleUrl: './password-restore.component.css',
})
export class PasswordRestoreComponent {
  email = '';
  message = '';
  error = '';

  constructor(private dataService: DataService) {}

  sendResetEmail() {
    this.message = '';
    this.error = '';

    if (!this.email.trim()) {
      this.error = 'Please enter your email.';
      return;
    }

    this.dataService.resetPassword(this.email).subscribe({
      next: (res) => {
        this.message = res.message || 'Password reset link sent.';
      },
      error: (err) => {
        this.error = err.error?.message || 'Something went wrong.';
      },
    });
  }
}
