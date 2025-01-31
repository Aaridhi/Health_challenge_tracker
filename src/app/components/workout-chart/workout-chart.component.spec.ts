import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';
import { UserWorkout } from '../../services/workout.service';
import { NgxEchartsModule } from 'ngx-echarts';

describe('WorkoutChartComponent', () => {
  let component: WorkoutChartComponent;
  let fixture: ComponentFixture<WorkoutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutChartComponent, NgxEchartsModule], // ✅ FIXED: Use imports instead of declarations
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateChart when selectedUser changes', () => {
    spyOn(component, 'updateChart');
    component.selectedUser = {
      id: 1,
      name: 'John Doe',
      workouts: [{ type: 'Running', minutes: 30 }],
    } as UserWorkout;
    component.ngOnChanges();
    expect(component.updateChart).toHaveBeenCalled();
  });

  it('should not call updateChart if selectedUser is null', () => {
    spyOn(component, 'updateChart');
    component.selectedUser = null;
    component.ngOnChanges();
    expect(component.updateChart).not.toHaveBeenCalled();
  });

  it('should not throw error when updateChart is called with null selectedUser', () => {
    component.selectedUser = null;
    expect(() => component.updateChart()).not.toThrow();
  });

  it('should update chartOptions correctly', () => {
    component.selectedUser = {
      id: 2,
      name: 'Jane Doe',
      workouts: [
        { type: 'Cycling', minutes: 60 },
        { type: 'Swimming', minutes: 45 },
      ],
    } as UserWorkout;
    
    component.updateChart();

    expect(component.chartOptions).toEqual(
      jasmine.objectContaining({
        title: jasmine.objectContaining({
          text: "Jane Doe's Workout Progress",
        }),
        xAxis: jasmine.objectContaining({
          data: ['Cycling', 'Swimming'],
        }),
      })
    );
  });
});
