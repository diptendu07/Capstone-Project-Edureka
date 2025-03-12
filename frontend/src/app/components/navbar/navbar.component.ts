import { Component, inject, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [RouterModule, CommonModule]
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  user: any = null;

  constructor() {
    // Effect to watch for changes in the user state
    effect(() => {
      this.user = this.authService.getUser();
    });
  }

  logout() {
    this.authService.logout();
  }
}
