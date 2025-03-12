import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSignal = signal<any>(null);
  private platformId = inject(PLATFORM_ID); // Inject platform ID

  constructor(private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userSignal.set(JSON.parse(storedUser));
      }
    }
  }

  login(user: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSignal.set(user);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      this.userSignal.set(null);
      this.router.navigate(['/login']);
    }
  }

  getUser() {
    return this.userSignal();
  }

  getUserSignal() {
    return this.userSignal;
  }
}
