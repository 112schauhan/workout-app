import { ExerciseModel, WorkoutModel } from "./models";

export const resolvers = {
    Query: {
        workoutmodels: async () => {
            try {
                return await WorkoutModel.find().populate('exercises');
            } catch (err: any) {
                throw new Error(err);
            }
        },

        workoutById: async (_: any, { input }: any) => {
            try {
                const { id } = input;
                return await WorkoutModel.findById(id).populate('exercises');
            } catch (err: any) {
                throw new Error(err);
            }
        },

        exercisesmodels: async () => {
            try {
                return await ExerciseModel.find();
            } catch (err: any) {
                throw new Error(err);
            }
        },
        // Add more query resolvers as needed
    },
    Mutation: {

        addWorkout: (_: any, args: any) => {
            let newWorkout = new WorkoutModel(args.workoutInput);
            return newWorkout.save();
        },

        addExerciseToWorkout: async (_: any, { input }: any) => {
            try {
                const { id, title } = input;

                // Find the workout by ID
                const workout = await WorkoutModel.findById(id);

                // Create a new exercise

                const newExercise = new ExerciseModel({ title });
                // Save the exercise
                const savedExercise = await newExercise.save();
                return savedExercise;


            } catch (error) {
                console.error("Error adding exercise to workout:", error);
                throw error;
            }
        },

        associateExerciseWithWorkout: async (_: any, { exerciseId, workoutId }: any) => {
            // Find the workout by ID
            const workout = await WorkoutModel.findById(workoutId);
            const exercise = await ExerciseModel.findById(exerciseId);

            if (!workout) {
                throw new Error(`Workout with ID ${workoutId} not found`);
            }
            // Update the workout to associate it with the exercise
            workout.exercises.push(exercise);
            const savedWorkout = await workout.save();

            // Return the updated workout
            return savedWorkout;
        },
    },
};