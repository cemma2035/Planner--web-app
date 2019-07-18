let loginUrl = "/api/login";
loginUrl = `${api_link}${loginUrl}`;
const userEmail = _("#newUserEmail");
const email = localStorage.getItem("email") || "";

// For signUp
if (regForm) {
    axios.interceptors.request.use((config) => {
        // Do something before request is sent
        regForm.querySelector("button[type='submit']").innerHTML = loader;
        return config;
    }, (error) => {
        // Do something with request error
        handleError(error.response);
        return Promise.reject(error);
    });
    
    // Add a response interceptor
    axios.interceptors.response.use((response) => {
        // Do something with response data
        regForm.querySelector("button[type='submit']").innerHTML = `${"<i class='fa fa-arrow-right'></i>"}`;
        $('#signUpModal').modal('show');
        return response;
    }, (error) => {
        // Do something with response error
        regForm.querySelector("button[type='submit']").innerHTML = `${"<i class='fa fa-arrow-right'></i>"}`;
        handleError(error.response);
        return Promise.reject(error);
    });

    userEmail.setAttribute("value", email);

    regForm.addEventListener("submit", e => {
        e.preventDefault();
        
        let registerUrl = "/api/register";
        registerUrl = `${api_link}${registerUrl}`;
        let formData = new FormData(regForm);
        const passwordValue = formData.get("password");

        formData.set("password_confirmation", passwordValue);

        axios.post(registerUrl, formData)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err.response);
        })
    })
}

// For signIn
if (loginForm) {
    axios.interceptors.request.use((config) => {
        // Do something before request is sent
        loginForm.querySelector("button[type='submit']").innerHTML = loader;
        return config;
    }, (error) => {
        // Do something with request error
        handleError(error.response);
    });
    
    // Add a response interceptor
    axios.interceptors.response.use((response) => {
        // Do something with response data
        loginForm.querySelector("button[type='submit']").innerHTML = `${"Log In"}`;
        return response;
     }, (error) => {
        // Do something with response error
        loginForm.querySelector("button[type='submit']").innerHTML = `${"Log In"}`;
        handleError(error.response);
     });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        
        let formData = new FormData(loginForm);

        axios.post(loginUrl, formData)
        .then((response) => {
            const userData = response.data.data;
            localStorage.setItem("userData", JSON.stringify(userData));
            setTimeout(replaceLocation("../dashboard/dashboard.html"), 2000);
        })
        .catch((err) => {
            handleError(err.response);
        })
    })
}
