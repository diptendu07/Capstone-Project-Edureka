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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStudents();
    this.fetchLeaveRequests();
  }

  fetchStudents() {
    this.http.get<any[]>('https://capstone-project-edureka-1.onrender.com/api/admin/students').subscribe(
      data => this.students = data,
      error => console.error('Error fetching students', error)
    );
  }

  fetchLeaveRequests() {
    this.http.get<any[]>('https://capstone-project-edureka-1.onrender.com/api/admin/leave-requests').subscribe(
      data => this.leaveRequests = data,
      error => console.error('Error fetching leave requests', error)
    );
  }

  enrollStudent() {
    this.http.post('https://capstone-project-edureka-1.onrender.com/api/admin/enroll-student', this.newStudent).subscribe(
      response => {
        alert('Student enrolled successfully!');
        this.newStudent = { name: '', email: '', password: '' }; 
        this.fetchStudents(); 
      },
      error => console.error('Error enrolling student', error)
    );
  }

  toggleBlockStudent(studentId: string) {
    this.http.put(`https://capstone-project-edureka-1.onrender.com/api/admin/block-student/${studentId}`, {}).subscribe(
      response => {
        alert('Student status updated!');
        this.fetchStudents();
      },
      error => console.error('Error blocking student', error)
    );
  }

  updateLeave(studentId: string, leaveId: string, status: string) {
    this.http.put('https://capstone-project-edureka-1.onrender.com/api/admin/manage-leave', { studentId, leaveId, status }).subscribe(
      response => {
        alert(`Leave ${status} successfully!`);
        this.fetchLeaveRequests();
      },
      error => console.error('Error updating leave request', error)
    );
  }
}
