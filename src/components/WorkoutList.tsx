// components/WorkoutList.tsx

const WorkoutList = (props?: any) => {
    return (
        <div>
            {/* Render your data here */}
            <h1>WorkoutList</h1>
            {
                props?.data?.workoutmodels?.map((workout: any) => {
                    return <div key={workout?._id}>
                        {workout?.title}
                        <ul>
                            {workout?.exercises?.map((exercise: any) => {
                                return <li key={exercise?.id}>{exercise?.title}</li>
                            })}
                        </ul>
                    </div>
                })
            }
        </div>
    );
};

export default WorkoutList;
