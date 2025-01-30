import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { UserWorkout } from '../../services/workout.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnChanges {
  @Input() selectedUser: UserWorkout | null = null;

  chartData: ChartData<'bar'> = { labels: [], datasets: [] };
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    if (!this.selectedUser) {
      this.chartData = { labels: [], datasets: [] };
      return;
    }

    this.chartData = {
      labels: this.selectedUser.workouts.map(w => w.type),
      datasets: [
        {
          label: 'Minutes',
          data: this.selectedUser.workouts.map(w => w.minutes),
          backgroundColor: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        }
      ]
    };
  }
}
