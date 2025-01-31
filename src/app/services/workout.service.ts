import { Injectable } from '@angular/core';

export interface Workout {
  type: string;
  minutes: number;
}

export interface UserWorkout {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageKey = 'workoutData';
  private workouts: UserWorkout[] = [];

  constructor() {
    this.loadWorkouts();
  }

  private loadWorkouts() {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.workouts = JSON.parse(storedData);
    } else {
      this.workouts = [
        { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
        { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] },
      ];
      this.saveWorkouts();
    }
  }

  private saveWorkouts() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.workouts));
  }

  getWorkouts(): UserWorkout[] {
    return [...this.workouts]; // Return a copy
  }

  addWorkout(name: string, type: string, minutes: number) {
    if (!name.trim() || !type.trim() || minutes <= 0) {
      return; // Prevent empty or invalid workouts
    }

    const existingUser = this.workouts.find(user => user.name.toLowerCase() === name.toLowerCase());

    if (existingUser) {
      const existingWorkout = existingUser.workouts.find(workout => workout.type === type);
      if (!existingWorkout) {
        existingUser.workouts.push({ type, minutes });
      }
    } else {
      const newUser: UserWorkout = {
        id: this.workouts.length + 1,
        name,
        workouts: [{ type, minutes }]
      };
      this.workouts.push(newUser);
    }
    this.saveWorkouts();
  }
}
