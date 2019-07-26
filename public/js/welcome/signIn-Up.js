let loginUrl = "/api/signin";
loginUrl = `${api_link}${loginUrl}`;
const userEmail = _("#newUserEmail");
const email = localStorage.getItem("email") || "";

// check if user authentication and email confirmation done
const urlParams = new URLSearchParams(window.location.search);
const cToken = urlParams.get('confirm_token')? urlParams.get('confirm_token') : null;

if (cToken) {
    // TODO: add preloader
    _(".preloader").style.visibility = "visible";
    _("#pills-home").style.display = "none";
    _("#workspace-tab").style.display = "block";
    _("#workspace-tab").style.opacity = "1";
    // make everything b&w until server response
    axios.get(`${api_link}/api/confirmation/${cToken}`)
    .then(response => {
        _(".preloader").style.visibility = "hidden";
        const {user} = response.data.data;
        localStorage.setItem("userData", JSON.stringify(user));
        const userData = JSON.parse(localStorage.getItem("userData"));
        console.log(userData);
    })
    .catch(error => {
        _(".preloader").style.visibility = "hidden";
        console.log(error.response);
    })
}

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

        axios.post(registerUrl, formData)
        .then(response => {
            console.log(response.data);
            _("#userMail").innerHTML = `Please check your mail for the verification link sent to <a href='#'>${email}</a>`;
        })
        .catch(err => {
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
            console.log(err.response);
            handleError(err.response);
        })
    })
}
