import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    workouts: [],
    exercises: [],
    loading: false,
    error: null,
};

const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        setWorkouts(state, action) {
            state.workouts = action.payload;
        },
        setExercises(state, action) {
            state.exercises = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setWorkouts, setExercises, setLoading, setError } = workoutSlice.actions;

export default workoutSlice.reducer;
