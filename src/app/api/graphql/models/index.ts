// User Model Creation
import mongoose, {Schema } from "mongoose";

const exerciseSchema: Schema = new mongoose.Schema({
    title: String
})

const ExerciseModel = mongoose.models.ExerciseModel || mongoose.model('ExerciseModel', exerciseSchema);

const workOutSchema: Schema = new mongoose.Schema({
    // Define user fields here matching the GraphQL schema
    title: {
        type: String,
        required: true
    },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'ExerciseModel' }],

    date: {
        type: String,
        default: Date.now.toString()
    }
});

const WorkoutModel = mongoose.models.WorkoutModel || mongoose.model('WorkoutModel', workOutSchema);
export { WorkoutModel, ExerciseModel }