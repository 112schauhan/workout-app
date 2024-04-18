"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Fragment, useEffect, useState } from "react";
import interactionPlugin from "@fullcalendar/interaction"; // Import interaction plugin for drag and drop
import client from '@/app/lib/graphql';
import AddWorkout from "../Workout/AddWorkout";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_EXERCISES, GET_WORKOUTS } from "@/app/api/graphql/queries/getAllWorkouts";
import { ADD_EXERCISE_TO_WORKOUT, ADD_WORKOUT, ASSOCIATE_EXERCISE_TO_WORKOUT } from "@/app/api/graphql/queries/addWorkouts";
import { useDispatch, useSelector } from "react-redux";
import { setError, setExercises, setWorkouts } from "@/store/workoutSlice";
import { AddExercise } from "../Exercise/AddExercise";
import { Typography } from "@mui/material";
import WorkoutList from "../Workout/WorkoutList";
import { dateLogic } from "@/utils/dateLogic";
import Loader from "../UI/Loader";
const CalendarPage = (props: any) => {
    const { loading,data } = useQuery(GET_WORKOUTS, { client });
    const exercisesData = useQuery(GET_ALL_EXERCISES, { client });
    const [mutateFunction] = useMutation(ADD_WORKOUT, { client });
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [openExerciseModal, setOpenExerciseModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState<any>();
    // const [addExerciseToWorkout] = useMutation(ADD_EXERCISE_TO_WORKOUT, { client });
    const [associateExerciseToWorkout] = useMutation(ASSOCIATE_EXERCISE_TO_WORKOUT, { client });
    const allExercises = useQuery(GET_ALL_EXERCISES, { client });
    const [handleWorkoutDetails, setHandleWorkoutDetails] = useState(false);


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleExerciseOpenModal = () => {
        setOpenExerciseModal(true);
    }

    const handleCloseExerciseModal = () => {
        setOpenExerciseModal(false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (data) {
            let { workoutmodels } = data;
            let updatedModels = workoutmodels?.map((item: any) => ({
                ...item,
                date: dateLogic(item?.date)
            }));

            dispatch(setWorkouts(updatedModels));
        }

        if (exercisesData) {
            let exerciseModels = exercisesData?.data?.exercisesmodels;
            let updatedModels = exerciseModels?.map((item: any) => ({
                ...item,
                date: dateLogic(item?.date)
            }));

            dispatch(setExercises(updatedModels));
        }
    }, [data, dispatch, exercisesData]);

    const [clickedDate, setClickedDate] = useState("");
    const handleProgramSelection = (selectInfo?: any) => {
        const workoutSelected = {
            _id: selectInfo?.event?.extendedProps?._id,
            exercises: selectInfo?.event?.extendedProps?.exercises,
            date: selectInfo?.event?.startStr,
            title: selectInfo?.event?.title
        }
        setSelectedWorkout(workoutSelected)
        setHandleWorkoutDetails(true);
    };

    const { workouts } = useSelector((state: any) => state.workout);

    const addWorkoutMutation = async (event: any) => {
        const { data } = await mutateFunction({
            variables: {
                workoutInput: {
                    title: event?.title,
                    date: event?.date,
                    exercises: []
                }
            },
        });

        return data;
    }

    const handleProgramEdit = async (arg: any) => {
        // Update the event's start and end dates when dropped
        const updatedEvent: any = {
            title: arg.event.title,
            exercises: arg.event.extendedProps.exercises?.map((exercise: any) => ({ title: exercise?.title, id: exercise?.id })),
            date: arg.event.startStr,
        };

        //Check if workout is already present
        const duplicateWorkout = workouts?.filter((workout: any) => (workout?.date === arg?.event?.startStr && workout?.title === arg?.event?.title));
        if (duplicateWorkout?.length > 0) {
            alert('Cannot add duplicate workout');
            return;
        }


        // Add the workouts
        const addedData = await addWorkoutMutation(updatedEvent);
        // Associate exercises with the workout 
        const associatedExercises = await Promise.all(updatedEvent?.exercises?.map(async (result: any) => {
            return await associateExerciseToWorkout({
                variables: {
                    exerciseId: result?.id,
                    workoutId: addedData?.addWorkout?._id,
                },
                refetchQueries: [{query:GET_WORKOUTS}]
            })
        }));
    };

    const handleEventDragStart = (arg: any) => {
        // Apply CSS transition during drag start
        arg.el.style.transition = "transform 0.2s";
    };

    const handleEventDragStop = (arg: any) => {
        // Reset CSS transition after drag stop
        arg.el.style.transition = "";
    };

    const eventContent = (arg: any) => {
        // Add logic to display sub-events within the main events
        // const duplicateWorkout = workouts?.filter((workout: any) => (workout?.date === arg?.event?.startStr && workout?.title === arg?.event?.title));
        // if (duplicateWorkout?.length > 0) {
        //     alert('Cannot add duplicate workout');
        //     return; 
        // }

        return (
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, marginBottom: '8px', fontSize: 'clamp(8px, 2vw, 16px)',textWrap:'wrap' }}>{arg?.event?.title}</Typography>
        );
    };

    const eventAllow = (dropInfo: any, draggedEvent: any) => {
        // Check if the event is being dropped on the same date as its original date
        // Function to determine if an event can be dragged and dropped

        // Check if there is any event on the target date
        const eventsOnTargetDate = workouts.filter(
            (workout: any) => workout.date === dropInfo.startStr
        );
        // Check if the dragged event already exists on the target date
        const eventAlreadyExists = eventsOnTargetDate.some(
            (event: any) => event.title === draggedEvent?.title
        );

        // If the dragged event already exists on the target date, prevent dropping
        if (eventAlreadyExists) {
            return false;
        }
        // Allow dropping if the event does not already exist on the target date
        return true;
    };
    const addExercise = (arg: any) => {
        setClickedDate(arg?.dateStr);
        handleOpenModal();
    };

    return (
        <Fragment>
            {loading && <Loader loading={loading}/>}
            {
                openModal && <AddWorkout workoutSelected={selectedWorkout?._id} clickedDate={clickedDate} openModal={openModal} handleCloseModal={handleCloseModal} handleOpenModal={handleOpenModal} />
            }
            {
                openExerciseModal && <AddExercise
                    openModal={openExerciseModal} handleCloseModal={handleCloseExerciseModal}
                    handleOpenModal={handleExerciseOpenModal}
                    workoutSelected={selectedWorkout}
                />
            }
            {
                handleWorkoutDetails && <WorkoutList
                    setHandleWorkoutDetails={setHandleWorkoutDetails}
                    handleWorkoutDetails={handleWorkoutDetails}
                    selectedWorkout={selectedWorkout}
                    setOpenExerciseModal={setOpenExerciseModal}
                />
            }
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={workouts}
                eventClick={handleProgramSelection}
                eventDrop={handleProgramEdit}
                eventDragStart={handleEventDragStart}
                eventDragStop={handleEventDragStop}
                eventAllow={eventAllow}
                scrollTime={new Date().toISOString().substring(11, 16)} // Scrolls to the current time
                // scrollTimeReset="00:00:00" // Resets the scroll position to the start of the day
                eventContent={eventContent}
                dateClick={(arg) => addExercise(arg)}
                droppable={true}
                editable={true}
            />
        </Fragment>
    );
};

export default CalendarPage;