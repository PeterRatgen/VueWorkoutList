import { AxiosInstance } from 'axios';

export async function validateToken(apiInstance : AxiosInstance) {
        try {
            let response = await apiInstance.get("/user_validateToken");
            if (response.status == 200) {
                Promise.resolve({ validated : true});
            } else if (response.status == 401) {
                Promise.resolve({ validated : false });
            }
        } catch (err) {
            console.trace();
            console.log(err);
        }
}

export async function login(apiInstance : AxiosInstance, data : { email : string, password : string}) {
    try {
        let response = await apiInstance.post('/login',
        {
            email : data.email, 
            password: data.password
        });

        if (response.status == 200) {
            Promise.resolve();
        } else {
            Promise.reject("API error occured");
        }
    } catch (err) {
        console.trace();
        console.log(err);
    }
}
