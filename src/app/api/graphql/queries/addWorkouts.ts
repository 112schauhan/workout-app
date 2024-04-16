import { gql } from "@apollo/client";

export const ADD_WORKOUT = gql`
  mutation AddWorkout($workoutInput: WorkoutInput) {
  addWorkout(workoutInput: $workoutInput) {
    title,
    _id,
    date,
    exercises {
      id,
      title
    }
  }
}
`;

export const ADD_EXERCISE_TO_WORKOUT = gql`
mutation AddExerciseToWorkout($input: AddExerciseToWorkoutInput!) {
  addExerciseToWorkout(input: $input) {
    title,
    id,
  }
}
`;

export const ASSOCIATE_EXERCISE_TO_WORKOUT = gql`
mutation AssociateExerciseWithWorkout($exerciseId: ID!, $workoutId: ID!) {
  associateExerciseWithWorkout(exerciseId: $exerciseId, workoutId: $workoutId) {
    title,
    id,
  }
}`