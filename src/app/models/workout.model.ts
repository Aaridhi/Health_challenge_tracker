export interface Workout {
    type: string;
    minutes: number;
  }
  
  export interface UserWorkout {
    id: number;
    name: string;
    workouts: Workout[];
  }
  