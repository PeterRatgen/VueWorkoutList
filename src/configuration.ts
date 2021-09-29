let serverUrl = ''

if (process.env.NODE_ENV == "production") {
    serverUrl = 'RUN_TIME_API_URL'
} else {
    let url = process.env.VUE_APP_API_URL;
    if (url != undefined) {
        serverUrl = url;
    }
}

export default serverUrl;
