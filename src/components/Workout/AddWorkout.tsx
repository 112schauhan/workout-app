import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_WORKOUT } from '@/app/api/graphql/queries/addWorkouts';
import client from '@/app/lib/graphql';
import CustomModal from '../CustomModal/CustomModal';
import { GET_WORKOUTS } from '@/app/api/graphql/queries/getAllWorkouts';
import { useSelector } from 'react-redux';
const AddWorkout = (props: any) => {
    const [mutateFunction] = useMutation(ADD_WORKOUT, { client });
    const { workouts } = useSelector((state: any) => state.workout);


    const [formData, setFormData] = useState({
        workoutTitle: '',
        addDate: props?.clickedDate,
    });

    const [exercisesTitle, setExercisesTitle] = useState<any>([]);

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle form submission here
        if (!formData?.workoutTitle) {
            alert("Title is required");
        }
        const dataSubmit = {
            title: formData?.workoutTitle,
            date: props?.clickedDate ?? "",
            exercises: exercisesTitle?.map((exercise: any) => ({ title: exercise?.title }))
        }

        const resultData = workouts?.filter((workout: any) => {
            if (workout?.date === dataSubmit?.date && workout?.title === dataSubmit?.title) {
                return workout;
            }
        })

        const workoutInput = {
            title: formData?.workoutTitle,
            date: dataSubmit?.date,
            exercises: [...exercisesTitle]
        }

        if (resultData?.length <= 0) {
            mutateFunction({
                variables: {
                    workoutInput: {
                        title: formData?.workoutTitle,
                        date: dataSubmit?.date,
                        exercises: [...exercisesTitle]
                    }
                },
                refetchQueries: [{ query: GET_WORKOUTS }]
            });

            props?.handleCloseModal();

        } else {
            props?.handleCloseModal();
            return alert('Workout is already added');
        }
    };

    return (
        <CustomModal open={props?.openModal} onClose={props?.handleCloseModal} title="Add Workout">

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    name="workoutTitle"
                    label="Workout Name"
                    value={formData.workoutTitle}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    data-testid={"workout-name-textfield"}
                    sx={{
                        marginBottom: '20px'
                    }}
                />


                <TextField
                    id="date"
                    label="Select Date"
                    type="date"
                    defaultValue={props?.clickedDate} // Set a default value if needed
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{
                        marginBottom: '20px'
                    }}
                    disabled
                />

                <Button type="submit" variant="contained" color="primary"
                    sx={{ alignSelf: 'center', width: '100%', marginTop: '8px' }}>
                    Submit
                </Button>
            </form>
        </CustomModal>
    );
};

export default AddWorkout;
