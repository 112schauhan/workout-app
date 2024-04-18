import { IconButton, Typography, Grid, TextField, Button, ListItemIcon, ListItem, ListItemText } from "@mui/material"
import CustomModal from "../CustomModal/CustomModal"
import Add from "@mui/icons-material/Add"
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXERCISE_TO_WORKOUT, ASSOCIATE_EXERCISE_TO_WORKOUT } from "@/app/api/graphql/queries/addWorkouts";
import { GET_ALL_EXERCISES, GET_WORKOUTS } from "@/app/api/graphql/queries/getAllWorkouts";
import client from "@/app/lib/graphql";
import { useSelector } from "react-redux";
import FitnessCenter from "@mui/icons-material/FitnessCenter";
import { compareArrays } from "@/utils/compareArrays";

export const AddExercise = (props: any) => {
    const [enterExercise, setEnterExercise] = useState("");
    const [exercisesTitle, setExercisesTitle] = useState<any>([]);
    const [addExerciseToWorkout] = useMutation(ADD_EXERCISE_TO_WORKOUT, { client });
    const [associateExerciseToWorkout] = useMutation(ASSOCIATE_EXERCISE_TO_WORKOUT, { client });
    const { workouts, exercises } = useSelector((state: any) => state.workout);

    const associateExercise = async () => {
        try {

            const comparisonResult = compareArrays(exercisesTitle, exercises);
            await comparisonResult?.forEach(async (exercise: any) => {
                await associateExerciseToWorkout({
                    variables: {
                        exerciseId: exercise?.id,
                        workoutId: props?.workoutSelected?._id,
                    },
                    refetchQueries:[{query:GET_WORKOUTS}]
                });
            });
           
            props?.handleCloseModal();
            alert("Exercises have been added");

            // return data;
        } catch (error) {
            console.log('Error caught ', error);
        }
    }

    const handleExerciseContentChange = (e: any) => {
        setEnterExercise(e.target.value);
    }

    const createExerciseList = async () => {
        if (enterExercise === "") {
            return alert('Provide an exercise to be added');
        }

        const filterdbDuplicates = exercises?.filter((exercise: any) => exercise?.title === enterExercise);
        debugger;
        if (filterdbDuplicates?.length <= 0) {
            const { data } = await addExerciseToWorkout({
                variables: {
                    input: {
                        id: props?.workoutSelected?._id,
                        title: enterExercise,
                    },
                },
                refetchQueries: [{ query: GET_ALL_EXERCISES }]
            });
        }

        const filterDuplicateStateEntry = exercisesTitle?.filter((exercise: any) => exercise === enterExercise);
        if (filterDuplicateStateEntry?.length <= 0) {
            setExercisesTitle([...exercisesTitle, enterExercise]);
        } else {
            alert("Exercise is already appended into this workout");
        }

        setEnterExercise("");
    }
    return (
        <CustomModal open={props?.openModal} onClose={props?.handleCloseModal} title="Add Exercises">
            <form>
                <ul>
                    {exercisesTitle?.map((exercise: any, index: number) => {
                        return <ListItem key={index}>
                            <ListItemIcon>
                                <FitnessCenter />
                            </ListItemIcon>
                            <ListItemText
                                primary={exercise}
                            />
                        </ListItem>
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
                        sx={{ fontSize: '12px' }}
                    />
                    <IconButton aria-label="add"
                        onClick={createExerciseList}
                        data-testid={"Add Exercise"}>
                        <Add />
                    </IconButton>
                    {/* <IconButton aria-label="add" onClick={associateExercise} data-testid={"Add Exercise"}>
                        <AddCircle />
                    </IconButton> */}
                </Grid>
                <Button variant="contained"
                    color="primary" sx={{ width: '100%' }}
                    onClick={associateExercise}
                    data-testid={"Save Exercise"}>Add All</Button>
            </form>
        </CustomModal>
    )
}