import { IconButton, Typography, Grid, TextField } from "@mui/material"
import CustomModal from "../CustomModal/CustomModal"
import AddCircle from "@mui/icons-material/AddCircle"
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXERCISE_TO_WORKOUT, ASSOCIATE_EXERCISE_TO_WORKOUT } from "@/app/api/graphql/queries/addWorkouts";
import { GET_WORKOUTS } from "@/app/api/graphql/queries/getAllWorkouts";
import client from "@/app/lib/graphql";
import { useSelector } from "react-redux";

export const AddExercise = (props: any) => {
    const [enterExercise, setEnterExercise] = useState("");
    const [exercisesTitle, setExercisesTitle] = useState<any>([]);
    const [addExerciseToWorkout] = useMutation(ADD_EXERCISE_TO_WORKOUT, { client });
    const [associateExerciseToWorkout] = useMutation(ASSOCIATE_EXERCISE_TO_WORKOUT, { client });
    const { workouts } = useSelector((state: any) => state.workout);

    const createExercise = async () => {
        try {
            // Trigger the mutation with workout ID and exercise title
            const findWorkoutIndex = workouts?.findIndex((workout: any) => workout?._id === props?.workoutSelected?._id);
            console.log('Find index ', findWorkoutIndex);
            if (findWorkoutIndex > -1) {
                const exerciseFilter = workouts[findWorkoutIndex]?.exercises?.filter((exercise: any) => (exercise?.title === enterExercise));

                if (exerciseFilter?.length > 0) {
                    return null;
                }
            }
            const { data } = await addExerciseToWorkout({
                variables: {
                    input: {
                        id: props?.workoutSelected?._id,
                        title: enterExercise,
                    },
                },
            });

            return data;
        } catch (error) {
            console.error("Error adding exercise:", error);
        }

        if (exercisesTitle?.length > 0) {
            setExercisesTitle([...exercisesTitle, { title: enterExercise }]);
        } else {
            setExercisesTitle([{ title: enterExercise }])
        }

        setEnterExercise("");
    }

    const associateExercise = async () => {
        try {
            const resultData = await createExercise();

            console.log("create result ", resultData);
            console.log('Workout selected ', props?.workoutSelected);
            
            if (resultData === null) {
                return alert('Exercise is already added');
            }

            const { data } = await associateExerciseToWorkout({
                variables: {
                    exerciseId: resultData?.addExerciseToWorkout?.id,
                    workoutId: props?.workoutSelected?._id,
                },
                refetchQueries: [{ query: GET_WORKOUTS }]
            });

            return data;
        } catch (error) {
            console.log('Error caught ', error);
        }
    }

    const handleExerciseContentChange = (e: any) => {
        setEnterExercise(e.target.value);
    }
    return (
        <CustomModal open={props?.openModal} onClose={props?.handleCloseModal} title="Add Exercises">
            <form>
                <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 500 }}>Add Exercises</Typography>
                <ul>
                    {exercisesTitle?.map((exercise: any, index: number) => {
                        return <li key={index}>{exercise?.title}</li>
                    })}
                </ul>

                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <TextField
                        name="exerciseTitle"
                        label="Exercise Name"
                        onChange={handleExerciseContentChange}
                        margin="normal"
                        data-testid={"exercise-name-textfield"}
                        value={enterExercise}
                    />
                    <IconButton aria-label="add" onClick={associateExercise} data-testid={"Add Exercise"}>
                        <AddCircle />
                    </IconButton>
                </Grid>
            </form>
        </CustomModal>
    )
}