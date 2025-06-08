import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userName = '';
  isMobileMenuOpen = false;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getCurrentUser().subscribe({
      next: (user) => (this.userName = user.name),
      error: (err) => console.error('Nem sikerült lekérni a user nevet:', err),
    });
  }

  logout(): void {
    this.dataService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Logout hiba:', err);
        localStorage.clear();
        this.router.navigate(['']);
      },
    });
  }
}
