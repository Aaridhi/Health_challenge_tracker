import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  userName = '';
  workoutType = '';
  workoutMinutes: number | null = null;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes && this.workoutMinutes > 0) {
      this.workoutService.addWorkout(this.userName, this.workoutType, this.workoutMinutes);
      this.resetForm();
    }
  }

  resetForm() {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }
}
