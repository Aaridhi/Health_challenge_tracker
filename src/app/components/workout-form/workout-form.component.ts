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
  workoutMinutes: number = 0;  // ✅ Default to 0 instead of null

  // ✅ Error states for input validation
  nameError = false;
  typeError = false;
  minutesError = false;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    // Reset previous error states
    this.nameError = this.userName.trim() === '';
    this.typeError = this.workoutType === '';
    this.minutesError = this.workoutMinutes <= 0;

    // ✅ Stop execution if validation fails
    if (this.nameError || this.typeError || this.minutesError) {
      return;
    }

    // ✅ If all inputs are valid, add workout
    this.workoutService.addWorkout(this.userName, this.workoutType, this.workoutMinutes);
    this.resetForm();
  }

  resetForm() {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = 0;  // ✅ Reset to 0 instead of null
  }

  validateMinutes() {
    if (!this.workoutMinutes || this.workoutMinutes <= 0) {
      this.workoutMinutes = 0;
    }
  }
}
