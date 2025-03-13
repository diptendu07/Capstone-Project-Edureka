import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, RouterModule]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'student'; // Default role

  constructor(private router: Router, private http: HttpClient) {}

  async register() {
    try {
      await this.http.post<any>('https://capstone-project-edureka-1.onrender.com/api/auth/register', {
        name: this.name, 
        email: this.email, 
        password: this.password, 
        role: this.role
      }).toPromise();

      alert('Registration successful');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Registration Error:', error); // Debugging log
      alert('Registration failed');
    }
  }
}
