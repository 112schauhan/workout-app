export const typeDefs = `#graphql
  type Exercise {
    id: ID!
    title: String!
  }

  type Workout {
    _id: ID!
    date: String
    title:String!
    exercises: [Exercise]
  }

  type Query {
    workoutmodels: [Workout]!
    workoutById(id:ID!): [Workout]
    exercisesmodels: [Exercise]
  }

  input ExerciseInput {
    title:String!
  }

  input WorkoutInput {
    title:String,
    date: String,
    exercises:[ExerciseInput]
  }

  input AddExerciseToWorkoutInput {
    id: ID!
    title: String!
}

  type Mutation {
    # addWorkout(title: String!, exercises: [String]): Workout!
    addWorkout(workoutInput:WorkoutInput): Workout
    # Define other mutations as needed
    addExerciseToWorkout(input: AddExerciseToWorkoutInput!): Exercise!
    associateExerciseWithWorkout(exerciseId: ID!, workoutId: ID!): Exercise!

    updateWorkout(_id: ID!, workoutInput: WorkoutInput): Workout
    deleteWorkout(_id: ID!): Workout
  }
`;