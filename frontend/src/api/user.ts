import { AxiosInstance } from 'axios';

interface valiDate {
    validated : boolean
}

export async function validateToken(apiInstance : AxiosInstance) : Promise<valiDate | undefined> {
        try {
            let response = await apiInstance.get("/user_validateToken");
            if (response.status == 200) {
                return { validated : true};
            } else if (response.status == 401) {
                return { validated : false };
            }
        } catch (err) {
            console.trace();
            console.log(err);
            new Error("Something went wrong with the API Call");
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
