import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
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

  onSubmit() {
    this.dataService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/event-list']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed: Invalid credentials';
      },
    });
  }
}
