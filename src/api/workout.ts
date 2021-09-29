import { AxiosInstance } from 'axios'

import { IWorkout } from '../types/index'

export async function getWorkout (apiInstance : AxiosInstance) : Promise<IWorkout[] | undefined> {
  const response = await apiInstance.get('/workout')
  return JSON.parse(response.request.response)
}

export async function deleteWorkout (apiInstance : AxiosInstance, data : {
    workoutId : string
}) {
  apiInstance.delete('/workout/' + data.workoutId).then((res) => {
    if (res.status == 200) {

    } else {
      new Error('Error with response ' + res.status)
    }
  }).catch((err) => {
    console.trace()
    console.log(err)
  })
}

export async function renameWorkout (apiInstance : AxiosInstance, data : {
    workoutId : string,
    title : string
}) {
  apiInstance.post('/workout/rename', {
    id: data.workoutId,
    title: data.title
  }
  ).then((res) => {
    if (res.status == 200) {

    } else {
      new Error('API Error')
    }
  }).catch((err) => {
    console.trace()
    console.log(err)
  })
}

export async function addWorkout (apiInstance : AxiosInstance, data : IWorkout) : Promise<{ id : string} | undefined> {
  apiInstance.post('/workout', data)
    .then((res) => {
      if (res.status == 200) {
        return { id: res.data }
      } else {
        new Error('API Error')
        return undefined
      }
    })
    .catch((err) => {
      console.trace()
      console.log(err)
      return undefined
    })
  return undefined
}
