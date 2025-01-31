import { Component } from '@angular/core';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutFormComponent, WorkoutListComponent], // ✅ Remove WorkoutChartComponent
  template: `
    <h1>{{ title }}</h1>
    <app-workout-form></app-workout-form>
    <app-workout-list></app-workout-list>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  title = 'Health Challenge Tracker';
}
