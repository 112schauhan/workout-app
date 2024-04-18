import { Dispatch, SetStateAction } from "react";
import CustomModal from "../CustomModal/CustomModal";
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import { Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const WorkoutList = ({ handleWorkoutDetails, setHandleWorkoutDetails, selectedWorkout, setOpenExerciseModal }:
    {
        handleWorkoutDetails: boolean;
        setHandleWorkoutDetails: Dispatch<SetStateAction<boolean>>;
        selectedWorkout: any;
        setOpenExerciseModal: Dispatch<SetStateAction<boolean>>;
    }) => {

    const { _id, exercises, date, title } = selectedWorkout;
    const generateExerciseWindow = () => {
        setHandleWorkoutDetails(false);
        setOpenExerciseModal(true);
    }
    return (
        <CustomModal open={handleWorkoutDetails} onClose={() => setHandleWorkoutDetails(false)} title={title}>
            <List>
                {
                    exercises?.map((exercise: any) => {
                        return <ListItem key={exercise?.id}>
                            <ListItemIcon>
                                <FitnessCenter />
                            </ListItemIcon>
                            <ListItemText
                                primary={exercise?.title}
                            />
                        </ListItem>
                    })
                }
            </List>
            <Button onClick={generateExerciseWindow} sx={{ width: '100%' }} variant="outlined" data-testid="add-exercise">Add More</Button>
        </CustomModal>
    )
}

export default WorkoutList;