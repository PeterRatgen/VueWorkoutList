import { IWorkout } from '@/types'
import { AxiosInstance } from 'axios'

export interface WorkoutProcessState {
  workout : IWorkout,
  currentWorkout : number,
  apiInstance : AxiosInstance,
  completed : boolean,
  pickerState : {
    visible: boolean,
    pickerData: {
      unit: string,
      steps: number,
      number: number // the number to change in the picker
    } | undefined,
    data : number | undefined
  }
}

export default WorkoutProcessState
