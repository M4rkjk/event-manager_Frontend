import { Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userName = '';
  isMobileMenuOpen = false;


  constructor(private dataService: DataService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: (user) => {
        this.userName = user?.name || '';
      }
    });

    if (this.authService.isAuthenticated()) {
      this.dataService.getCurrentUser().subscribe({
        next: (user) => this.authService.setCurrentUser(user)
      });
    }
  }

  logout(): void {
    this.dataService.logout().subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Logout hiba:', err);
        this.authService.logout();
        this.router.navigate(['']);
      },
    });
  }
}
