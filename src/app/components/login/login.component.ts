import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill out both fields.';
      return;
    }

    this.dataService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);

        this.dataService.getCurrentUser().subscribe({
          next: (user) => {
            this.authService.setCurrentUser(user);
            this.router.navigate(['/event-list']);
          },
          error: () => {
            this.errorMessage =
              'Login succeeded, but failed to fetch user data.';
          },
        });
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else if (err.status === 422) {
          this.errorMessage = 'Please enter a valid email and password.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }
}
