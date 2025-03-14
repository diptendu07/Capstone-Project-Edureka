import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AdminComponent implements OnInit {
  students: any[] = []; 
  leaveRequests: any[] = []; // Existing leave request feature
  newStudent = { name: '', email: '', password: '' };

  apiUrl = 'https://capstone-project-edureka-1.onrender.com/api/admin'; // Update with actual backend URL

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStudents();
    this.fetchLeaveRequests();
  }

  // Fetch all students
  fetchStudents() {
    this.http.get<any[]>(`${this.apiUrl}/students`).subscribe(
      data => this.students = data,
      error => console.error('❌ Error fetching students', error)
    );
  }

  // Fetch leave requests
  fetchLeaveRequests() {
    this.http.get<any[]>(`${this.apiUrl}/leave-requests`).subscribe(
      data => this.leaveRequests = data,
      error => console.error('❌ Error fetching leave requests', error)
    );
  }

  // Enroll a new student
  enrollStudent() {
    this.http.post(`${this.apiUrl}/enroll-student`, this.newStudent).subscribe(
      response => {
        alert('✅ Student enrolled successfully!');
        this.newStudent = { name: '', email: '', password: '' }; 
        this.fetchStudents(); 
      },
      error => console.error('❌ Error enrolling student', error)
    );
  }

  // Block or Unblock Student
  toggleBlockStudent(studentId: string) {
    this.http.put(`${this.apiUrl}/block-student/${studentId}`, {}).subscribe(
      response => {
        alert('✅ Student status updated!');
        this.fetchStudents();
      },
      error => console.error('❌ Error blocking/unblocking student', error)
    );
  }

  // Update Leave Requests
  updateLeave(studentId: string, leaveId: string, status: string) {
    this.http.put(`${this.apiUrl}/manage-leave`, { studentId, leaveId, status }).subscribe(
      response => {
        alert(`✅ Leave ${status} successfully!`);
        this.fetchLeaveRequests();
      },
      error => console.error('❌ Error updating leave request', error)
    );
  }
}
