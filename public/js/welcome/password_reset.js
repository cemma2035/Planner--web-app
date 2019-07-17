const formResetPwd = _(".form-new-pwd");
const proceed = _("#proceedAfterReset"); //button

if (formResetPwd) {
    axios.interceptors.request.use((config) => {
        // Do something before request is sent
        formResetPwd.querySelector("button[type='submit']").innerHTML = loader;
        return config;
    }, (error) => {
        // Do something with request error
        handleError(error.response);
    });
    
    // Add a response interceptor
    axios.interceptors.response.use((response) => {
        // Do something with response data
        formResetPwd.querySelector("button[type='submit']").innerHTML = `${"Confirm"}`;
        replaceLocation("./password-confirmed");
        return response;
    }, (error) => {
        // Do something with response error
        formResetPwd.querySelector("button[type='submit']").innerHTML = `${"Confirm"}`;
        handleError(error.response);
    });

    formResetPwd.addEventListener("submit", e => {
        e.preventDefault();
    
        let resetUrl = "/api/reset/password";
        resetUrl = `${api_link}${resetUrl}`;
        let formData = new FormData(formResetPwd);
        const code = localStorage.getItem("code");
        formData.set("verify_code", code);
        formData = formDataToObject(formData);
          
        axios.put(resetUrl, formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
                handleError(err.response);
            })
    })    
}

if (proceed) {
    proceed.addEventListener("click", () => {
        axios.interceptors.request.use((config) => {
            // Do something before request is sent
            proceed.innerHTML = loader;
            return config;
        }, (error) => {
            // Do something with request error
            handleError(error.response);
        });
        
        // Add a response interceptor
        axios.interceptors.response.use((response) => {
            // Do something with response data
            proceed.innerHTML = `${"Proceed to Dashboard"}`;
            return response;
        }, (error) => {
            // Do something with response error
            proceed.innerHTML = `${"Proceed to Dashboard"}`;
            handleError(error.response);
        });
        // axios.post(loginUrl, formData)
        // .then((response) => {
        //     const userData = response.data.data;
        //     localStorage.setItem("userData", JSON.stringify(userData));
        //     setTimeout(replaceLocation("../dashboard/dashboard.html"), 2000);
        // })
        // .catch((err) => {
        //     handleError(err.response);
        // })
        setTimeout(replaceLocation("../dashboard/dashboard.html"), 2000);
    })
}


