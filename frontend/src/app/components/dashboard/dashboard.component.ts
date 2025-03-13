// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode'; // ✅ Import the correct function

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  user: any = {};
  leaveRequests: any[] = [];
  leaveReason: string = '';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const decodedToken: any = jwtDecode(token); // ✅ Decode JWT
        console.log('Decoded Token:', decodedToken);

        const response = await this.http.get<any>('https://capstone-project-edureka-1.onrender.com/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        }).toPromise();

        this.user = response;
        this.getLeaveRequests();
      }
    } catch (error) {
      console.error('Error fetching profile', error);
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token'); // ✅ Clear expired token
      window.location.href = '/'; // ✅ Redirect to login
    }
  }

  async getLeaveRequests() {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const response = await this.http.get<any>('https://capstone-project-edureka-1.onrender.com/api/student/view-leaves', {
          headers: { Authorization: `Bearer ${token}` }
        }).toPromise();
        this.leaveRequests = response.leaveRequests;
      }
    } catch (error) {
      console.error('Error fetching leave requests', error);
    }
  }

  async applyLeave() {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You must be logged in to apply for leave.');
          return;
        }

        await this.http.post('https://capstone-project-edureka-1.onrender.com/api/student/apply-leave', 
          { reason: this.leaveReason }, 
          { headers: { Authorization: `Bearer ${token}` } }
        ).toPromise();

        alert('Leave request submitted');
        this.getLeaveRequests();
        this.leaveReason = '';
      }
    } catch (error) {
      console.error('Error applying for leave', error);
    }
  }
}
