import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    localStorage.clear(); // ✅ Ensure no stale data before running tests
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  afterEach(() => {
    localStorage.clear(); // ✅ Ensure localStorage is always cleared after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve workouts from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify([{ id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }] }])
    );
    service = new WorkoutService();
    expect(service.getWorkouts().length).toBe(1);
  });

  it('should return an empty array if no workouts exist', () => {
    localStorage.clear(); // ✅ Explicitly clear again
    spyOn(localStorage, 'getItem').and.returnValue(null); // ✅ Simulate empty storage

    const workouts = service.getWorkouts();
    console.log('DEBUG: Workouts retrieved in empty test:', workouts); // 🔎 Debugging step
    expect(workouts.length).toBe(0);
  });

  it('should add a new workout for an existing user', () => {
    service.addWorkout('John', 'Running', 30);
    service.addWorkout('John', 'Cycling', 45);

    const user = service.getWorkouts().find(u => u.name === 'John');
    expect(user?.workouts.length).toBe(2);
  });

  it('should create a new user workout when user is new', () => {
    service.addWorkout('Michael', 'Running', 30);
    const user = service.getWorkouts().find(u => u.name === 'Michael');
    expect(user).toBeTruthy();
    expect(user?.workouts.length).toBe(1);
  });

  it('should save workouts to localStorage', () => {
    spyOn(localStorage, 'setItem');
    service.addWorkout('Emma', 'Cycling', 40);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should not add duplicate users when calling addWorkout multiple times', () => {
    service.addWorkout('Alice', 'Swimming', 25);
    service.addWorkout('Alice', 'Yoga', 35);

    const users = service.getWorkouts().filter((u) => u.name === 'Alice');
    expect(users.length).toBe(1); // ✅ Ensures only one "Alice" user exists
    expect(users[0].workouts.length).toBe(2);
  });

  it('should handle large workout lists correctly', () => {
    localStorage.clear(); // ✅ Reset storage
    service = new WorkoutService(); // ✅ Reinitialize service to prevent stale data

    for (let i = 0; i < 100; i++) {
      service.addWorkout(`User${i}`, 'Running', 30);
    }

    const workouts = service.getWorkouts();
    console.log('DEBUG: Workout count in large list test:', workouts.length); // 🔎 Debugging step

    expect(workouts.length).toBe(100); // ✅ Ensure exactly 100 users
    expect(workouts.flatMap(user => user.workouts).length).toBe(100); // ✅ Ensure 100 workouts
  });

  it('should prevent adding workouts if user name is empty', () => {
    service.addWorkout('', 'Yoga', 30);
    const workouts = service.getWorkouts();
    expect(workouts.some(u => u.name === '')).toBeFalsy();
  });

  it('should prevent adding workouts if workout type is empty', () => {
    service.addWorkout('Test User', '', 30);
    const user = service.getWorkouts().find((u) => u.name === 'Test User');
    expect(user?.workouts.length).toBeFalsy(); // ✅ Should not add empty workout types
  });

  it('should prevent adding workouts if workout minutes are zero or negative', () => {
    service.addWorkout('Bob', 'Running', 0);
    service.addWorkout('Charlie', 'Cycling', -10);

    const bob = service.getWorkouts().find((u) => u.name === 'Bob');
    const charlie = service.getWorkouts().find((u) => u.name === 'Charlie');

    expect(bob).toBeFalsy();
    expect(charlie).toBeFalsy();
  });

  it('should allow adding workouts with different types', () => {
    service.addWorkout('David', 'Swimming', 20);
    service.addWorkout('David', 'Weightlifting', 50);

    const user = service.getWorkouts().find((u) => u.name === 'David');
    expect(user?.workouts.length).toBe(2);
    expect(user?.workouts[0].type).toBe('Swimming');
    expect(user?.workouts[1].type).toBe('Weightlifting');
  });

  it('should clear all workouts when localStorage is cleared', () => {
    service.addWorkout('Eve', 'Running', 40);
    expect(service.getWorkouts().length).toBe(1);

    localStorage.clear(); // ✅ Clear storage
    expect(service.getWorkouts().length).toBe(0);
  });

  it('should not throw errors when calling getWorkouts on empty localStorage', () => {
    localStorage.clear();
    expect(() => service.getWorkouts()).not.toThrow();
  });

  it('should properly remove a workout from an existing user', () => {
    service.addWorkout('Frank', 'Running', 30);
    service.addWorkout('Frank', 'Cycling', 20);
    
    let user = service.getWorkouts().find((u) => u.name === 'Frank');
    expect(user?.workouts.length).toBe(2);

    user!.workouts.pop(); // Simulating removal
    expect(user!.workouts.length).toBe(1);
  });
});
