import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserWorkout } from '../../services/workout.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnChanges {
  @Input() selectedUser: UserWorkout | null = null;
  workoutData: any[] = [];

  view: [number, number] = [600, 300];

  // ✅ Use a predefined ngx-charts color scheme instead of defining `domain`
  colorScheme = 'cool';

  constructor() {}

  ngOnChanges() {
    if (this.selectedUser) {
      this.updateChart();
    }
  }

  updateChart() {
    if (!this.selectedUser) {
      this.workoutData = [];
      return;
    }

    this.workoutData = this.selectedUser.workouts.map(w => ({
      name: w.type,
      value: w.minutes
    }));
  }
}
