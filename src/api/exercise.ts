import { AxiosInstance } from 'axios';

export async function renameExercise(apiInstance : AxiosInstance, data : {
    workoutId: string,
    exerciseId : string,
    name : string
}) {
    apiInstance.put('/workout/rename_exercise', {
        id: data["workoutId"],
        exerciseId : data["exerciseId"],
        name : data["name"]
    }).then((res) => {
        if (res.status == 200) {
            return;
        }
    }).catch((err) => {
        console.trace();
        console.log(err);
    });
}


export async function deleteExercise(apiInstance : AxiosInstance, data : {
    workoutId : string,
    exerciseId : string
}) {
    apiInstance.put('/workout/delete_exercise', data).then((res) => {
            if( res.status == 200) {
                return;
            }
        }
    );
}
