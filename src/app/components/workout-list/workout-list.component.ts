import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserWorkout, WorkoutService } from '../../services/workout.service';
import { WorkoutChartComponent } from '../workout-chart/workout-chart.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, WorkoutChartComponent, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: UserWorkout[] = [];
  searchQuery = '';
  filterType = 'All';
  selectedUser: UserWorkout | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  // ✅ Add missing properties
  userName: string = '';
  selectedWorkout: string = '';
  workoutMinutes: number | null = null;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
  }

  getWorkoutTypes(user: UserWorkout): string {
    return user.workouts.map(w => w.type).join(', ');
  }

  getTotalMinutes(user: UserWorkout): number {
    return user.workouts.reduce((total, w) => total + w.minutes, 0);
  }

  getWorkoutCount(user: UserWorkout): number {
    return user.workouts.length;
  }

  filterWorkouts(): UserWorkout[] {
    let filtered = this.workoutService.getWorkouts();

    if (this.searchQuery.trim()) {
      filtered = filtered.filter((u) =>
        u.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.filterType !== 'All') {
      filtered = filtered.filter((u) => u.workouts.some((w) => w.type === this.filterType));
    }

    return filtered;
  }

  getPaginatedWorkouts(): UserWorkout[] {
    const filtered = this.filterWorkouts();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  selectUserForChart(user: UserWorkout) {
    this.selectedUser = null;
    setTimeout(() => {
      this.selectedUser = user;
    }, 50);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.filterWorkouts().length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  resetPagination(): void {
    this.currentPage = 1;
  }

  // ✅ Add function to handle adding a workout
  addWorkout() {
    if (!this.userName.trim() || !this.selectedWorkout || !this.workoutMinutes) {
      alert('Please fill out all fields before adding a workout.');
      return;
    }

    let user = this.workouts.find(u => u.name.toLowerCase() === this.userName.toLowerCase());

    if (!user) {
      user = { id: this.workouts.length + 1, name: this.userName, workouts: [] };
      this.workouts.push(user);
    }

    user.workouts.push({ type: this.selectedWorkout, minutes: this.workoutMinutes });

    this.userName = '';
    this.selectedWorkout = '';
    this.workoutMinutes = null;

    this.resetPagination();
  }
}
