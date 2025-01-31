import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['addWorkout']);

    await TestBed.configureTestingModule({
      imports: [WorkoutFormComponent, FormsModule], // ✅ FIXED: Use imports instead of declarations
      providers: [{ provide: WorkoutService, useValue: mockWorkoutService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a workout when form is valid', () => {
    component.userName = 'John';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.addWorkout();

    expect(mockWorkoutService.addWorkout).toHaveBeenCalledWith('John', 'Running', 30);
  });

  it('should not add a workout if userName is empty', () => {
    component.userName = '';
    component.workoutType = 'Yoga';
    component.workoutMinutes = 45;

    component.addWorkout();

    expect(mockWorkoutService.addWorkout).not.toHaveBeenCalled();
  });

  it('should not add a workout if workoutType is empty', () => {
    component.userName = 'Alice';
    component.workoutType = '';
    component.workoutMinutes = 25;

    component.addWorkout();

    expect(mockWorkoutService.addWorkout).not.toHaveBeenCalled();
  });

  it('should not add a workout if workoutMinutes is zero or negative', () => {
    component.userName = 'Bob';
    component.workoutType = 'Swimming';
    component.workoutMinutes = 0;

    component.addWorkout();

    expect(mockWorkoutService.addWorkout).not.toHaveBeenCalled();
  });

  it('should reset form after adding a workout', () => {
    component.userName = 'Charlie';
    component.workoutType = 'Dancing';
    component.workoutMinutes = 50;

    component.addWorkout();

    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBeNull();
  });

  it('should reset form when resetForm is called', () => {
    component.userName = 'Eve';
    component.workoutType = 'Boxing';
    component.workoutMinutes = 40;

    component.resetForm();

    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBeNull();
  });
});
