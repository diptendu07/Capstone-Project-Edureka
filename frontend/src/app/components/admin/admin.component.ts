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
  private http = inject(HttpClient);
  leaveRequests: any[] = [];

  ngOnInit() {
    this.getLeaveRequests(); // Load leave requests when component initializes
  }

  // ✅ Fetch Leave Requests
  getLeaveRequests() {
    this.http.get('https://capstone-project-edureka-1.onrender.com/api/admin/leave-requests').subscribe(
      (data: any) => {
        this.leaveRequests = data;
      },
      (error) => {
        console.error('Error fetching leave requests', error);
      }
    );
  }

  // ✅ Approve or Reject Leave
  updateLeave(studentId: string, leaveId: string, status: string) {
    this.http.put('https://capstone-project-edureka-1.onrender.com/api/admin/manage-leave', { studentId, leaveId, status }).subscribe(
      (response) => {
        console.log('Leave status updated:', response);
        this.getLeaveRequests(); // Refresh the list after update
      },
      (error) => {
        console.error('Error updating leave status', error);
      }
    );
  }
}
