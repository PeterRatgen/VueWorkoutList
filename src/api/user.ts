import { AxiosInstance } from 'axios'

interface valiDate {
    validated : boolean
}

export async function validateToken (apiInstance : AxiosInstance) : Promise<valiDate | undefined> {
  try {
    const response = await apiInstance.get('/user_validateToken')
    if (response.status === 200) {
      return { validated: true }
    } else if (response.status === 401) {
      return { validated: false }
    }
  } catch (err) {
    return { validated: false }
  }
}

export async function login (apiInstance : AxiosInstance, data : { email : string, password : string}) : Promise<void> {
  try {
    const response = await apiInstance.post('/login',
      {
        email: data.email,
        password: data.password
      })

    if (response.status !== 200) {
      Error('eror')
    }
  } catch (err) {
    console.trace()
    console.log(err)
  }
}
