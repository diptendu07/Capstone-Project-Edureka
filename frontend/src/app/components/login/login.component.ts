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
    this.http.post('http://localhost:5000/api/auth/login', { email: this.email, password: this.password }).subscribe(
      (response: any) => {
        if (response && response.token) {
          localStorage.setItem('user', JSON.stringify(response.user)); // ✅ Store user details
          localStorage.setItem('token', response.token); // ✅ Store JWT

          if (response.user.role === 'admin') {
            this.router.navigate(['/admin']); // Redirect to admin panel if admin
          } else {
            this.router.navigate(['/dashboard']); // Redirect students to dashboard
          }
        }
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
        console.error('Login failed', error);
      }
    );
  }
}
