const api_link = "https://goalsetterapi.herokuapp.com";
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('confirm_token');
const userInfoUrl = `${api_link}${"/confirmation/"}${token}`;

// send token to api using axios to get userInfo json
if (token) {
    axios.interceptors.request.use((config) => {
        // Do something before request is sent
        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error);
    });
    
    // Add a response interceptor
    axios.interceptors.response.use((response) => {
        // Do something with response data
        return response;
    }, (error) => {
        // Do something with response error
        return Promise.reject(error);
    });
    console.log("hello");
    axios.get(userInfoUrl, {
        confirm_token: token
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => console.log(error.response));
}

// remove token from url