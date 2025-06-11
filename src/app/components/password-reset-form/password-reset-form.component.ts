import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-reset-form',
  imports: [FormsModule],
  templateUrl: './password-reset-form.component.html',
  styleUrl: './password-reset-form.component.css',
})
export class PasswordResetFormComponent {
  token: string = '';
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message = '';
  error = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.dataService.resetPassword(this.email, this.token, this.newPassword, this.confirmPassword).subscribe({
      next: (res) => {
        this.message = res.message || 'Password has been reset.';
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.message || 'Error resetting password.';
        this.message = '';
      }
    });
}}
