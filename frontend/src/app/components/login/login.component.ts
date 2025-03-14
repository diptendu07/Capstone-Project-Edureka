import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('https://capstone-project-edureka-1.onrender.com/api/auth/login', { email: this.email, password: this.password })
      .subscribe(
        (response: any) => {
          if (response && response.token) {
            localStorage.setItem('user', JSON.stringify(response.user)); // ✅ Store user details
            localStorage.setItem('token', response.token); // ✅ Store JWT

            if (response.user.role === 'admin') {
              this.router.navigate(['/admin']); // Redirect admin
            } else {
              this.router.navigate(['/dashboard']); // Redirect student
            }
          }
        },
        (error) => {
          if (error.status === 403) {
            // 🔴 Show alert for blocked users
            window.alert('❌ Sorry!! Admin has blocked your Profile');
          } else {
            // ❌ Show invalid credentials message
            window.alert('❌ Invalid email or password. Please try again.');
          }
          console.error('Login failed', error);
        }
      );
  }
}
