let loginUrl = "/api/login";
loginUrl = `${api_link}${loginUrl}`;
const userEmail = _("#newUserEmail");
const email = localStorage.getItem("email") || "";

// For signUp
if (regForm) {
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
        // login immediately after sign up
        // .then(() => {
        //     let loginData = new FormData();
        //     loginData.set("email", formData.get("email"));
        //     loginData.set("email", formData.get("password"));

        //     axios.post(loginUrl, loginData)
        //     .then((response, err) => {
        //         console.log(response.data);
        //         console.log(err.response);
        //     })
        // })
        .catch((err) => {
            handleError(err.response);
        })
    })
}

// For signIn
if (loginForm) {
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
