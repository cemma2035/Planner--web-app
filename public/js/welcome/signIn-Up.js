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
        
        let registerUrl = "/api/signup";
        registerUrl = `${api_link}${registerUrl}`;
        let formData = new FormData(regForm);
        const email = formData.get("email");
        const mail = Object.keys(mailMap).find(key => email.includes(key));
        proceed.href = mailMap[mail];
        const passwordValue = formData.get("password");
        formData.set("password_confirmation", passwordValue);

        axios.post(registerUrl, formData)
        .then(response => {
            console.log(response.data);
            _("#userMail").innerHTML = `Please check your mail for the verification link sent to <a href='#'>${email}</a>`;
        })
        .catch(err => {
            console.log(err.constructor);
        })
    })
}

// user authentication and email confirmation done
const urlParams = new URLSearchParams(window.location.search);
const cToken = urlParams.get('confirm_token')? urlParams.get('confirm_token') : null;
console.log(cToken);

if (cToken) {
    axios.get(`${api_link}/confirmation/${cToken}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error.response);
        console.log(error.stack);
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
