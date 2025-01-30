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
  currentPage = 1;
  itemsPerPage = 5;

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

    if (this.searchQuery) {
      filtered = filtered.filter((u) => u.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    if (this.filterType !== 'All') {
      filtered = filtered.filter((u) => u.workouts.some((w) => w.type === this.filterType));
    }

    return filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  selectUserForChart(user: UserWorkout) {
    this.selectedUser = null;
    setTimeout(() => {
      this.selectedUser = user;
    }, 50);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.workoutService.getWorkouts().length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
