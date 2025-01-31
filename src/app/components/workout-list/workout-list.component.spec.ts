import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService, UserWorkout } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';
import { WorkoutChartComponent } from '../workout-chart/workout-chart.component';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let service: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutListComponent, FormsModule, WorkoutChartComponent],
      providers: [WorkoutService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total minutes correctly', () => {
    const user: UserWorkout = {
      id: 1,
      name: 'John',
      workouts: [
        { type: 'Running', minutes: 50 },
        { type: 'Cycling', minutes: 50 },
      ],
    };
    expect(component.getTotalMinutes(user)).toBe(100);
  });

  it('should return zero minutes if no workouts exist', () => {
    const user: UserWorkout = { id: 2, name: 'Alice', workouts: [] };
    expect(component.getTotalMinutes(user)).toBe(0);
  });

  it('should count number of workouts correctly', () => {
    const user: UserWorkout = {
      id: 2,
      name: 'Alice',
      workouts: [{ type: 'Yoga', minutes: 30 }, { type: 'Running', minutes: 45 }],
    };
    expect(component.getWorkoutCount(user)).toBe(2);
  });

  it('should return 0 if user has no workouts', () => {
    const user: UserWorkout = { id: 3, name: 'Mike', workouts: [] };
    expect(component.getWorkoutCount(user)).toBe(0);
  });

  it('should filter workouts correctly', () => {
    component.searchQuery = 'John';
    component.filterType = 'Running';
    component.workouts = [
        { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
        { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] },
    ];

    const filtered = component.filterWorkouts();
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toContain('John');  // Ensures partial match works
});


  it('should return empty array if no workouts match the filter', () => {
    component.searchQuery = 'UnknownUser';
    const filtered = component.filterWorkouts();
    expect(filtered.length).toBe(0);
  });

  it('should return all workouts if filterType is "All"', () => {
    component.workouts = [
      { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane', workouts: [{ type: 'Cycling', minutes: 40 }] },
    ];
    component.filterType = 'All';
    expect(component.filterWorkouts().length).toBe(2);
  });

  it('should get correct workout types', () => {
    const user: UserWorkout = {
      id: 4,
      name: 'Emma',
      workouts: [{ type: 'Cycling', minutes: 60 }, { type: 'Yoga', minutes: 20 }],
    };
    expect(component.getWorkoutTypes(user)).toBe('Cycling, Yoga');
  });

  it('should prevent nextPage when at last page', () => {
    component.currentPage = 2;
    component.itemsPerPage = 5;
    component.workouts = Array(10).fill({ id: 1, name: 'User', workouts: [{ type: 'Running', minutes: 30 }] });

    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should prevent prevPage when at first page', () => {
    component.currentPage = 1;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should change page correctly', () => {
    component.currentPage = 1;
    component.itemsPerPage = 1;
    component.workouts = [
      { id: 1, name: 'User 1', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'User 2', workouts: [{ type: 'Cycling', minutes: 40 }] },
    ];

    component.nextPage();
    expect(component.currentPage).toBe(2);
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should select a user for chart correctly', (done) => {
    const user: UserWorkout = {
      id: 5,
      name: 'Michael',
      workouts: [{ type: 'Swimming', minutes: 30 }],
    };
    component.selectUserForChart(user);
    setTimeout(() => {
      expect(component.selectedUser).toBe(user);
      done();
    }, 50);
  });

  it('should handle empty workout list', () => {
    spyOn(service, 'getWorkouts').and.returnValue([]);
    component.ngOnInit();
    expect(component.workouts.length).toBe(0);
  });

  it('should handle pagination with fewer users', () => {
    component.workouts = [{ id: 6, name: 'Test User', workouts: [{ type: 'Running', minutes: 15 }] }];
    component.currentPage = 1;
    component.itemsPerPage = 1;
    expect(component.getPaginatedWorkouts().length).toBe(1);
  });

  it('should reset pagination correctly when workouts change', () => {
    component.workouts = [
      { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane', workouts: [{ type: 'Cycling', minutes: 40 }] },
    ];
    component.currentPage = 2;
    component.resetPagination();
    expect(component.currentPage).toBe(1); // ✅ Ensuring pagination reset
  });
});
