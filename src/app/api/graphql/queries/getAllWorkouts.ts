import { gql } from "@apollo/client";

export const GET_WORKOUTS = gql`
  query GetAllWorkouts{
    workoutmodels {
      _id
      title
      date
      exercises {
        id
        title
      }
    }
  }
`;

export const GET_WORKOUT_BY_ID = gql`
query GetWorkout{
  workoutById(id:id) {
    _id
    title
    date
    exercises {
      id
      title
    }
  }
}
`;

export const GET_ALL_EXERCISES = gql`
query GetExercises{
  exercisesmodels{
    id
    title
  }
}
`;
