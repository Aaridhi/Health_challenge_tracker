import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserWorkout } from '../../services/workout.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnChanges {
  @Input() selectedUser: UserWorkout | null = null;
  chartOptions: EChartsOption = {};

  ngOnChanges() {
    if (this.selectedUser) {
      this.updateChart();
    }
  }

  updateChart() {
    if (!this.selectedUser) return;

    const workoutMinutes = this.selectedUser.workouts.map(w => w.minutes);
    const workoutTypes = this.selectedUser.workouts.map(w => w.type);

    this.chartOptions = {
      title: {
        text: `${this.selectedUser.name}'s Workout Progress`,
        left: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: workoutTypes
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: workoutMinutes,
          type: 'bar',
          color: '#3b82f6'
        }
      ]
    };
  }
}
