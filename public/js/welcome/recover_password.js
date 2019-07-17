const formFPwd = _(".form-forgotPwd");

axios.interceptors.request.use((config) => {
    // Do something before request is sent
    formFPwd.querySelector("button[type='submit']").innerHTML = loader;
    return config;
}, (error) => {
    // Do something with request error
    handleError(error.response);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
    formFPwd.querySelector("button[type='submit']").innerHTML = `${"Reset"}`;
    $('#resetModal').modal('show');
    return response;
 }, (error) => {
    // Do something with response error
    handleError(error.response);
 });


if (formFPwd) {
    formFPwd.addEventListener("submit", (e) => {
        e.preventDefault();

        let forgotPwdUrl = "/api/verify/email";
        forgotPwdUrl = `${api_link}${forgotPwdUrl}`;
        const formData = new FormData(formFPwd);
        const email = formData.get("email");
        // TODO: use regex to parse user email and check for email service provider

        axios.post(forgotPwdUrl, formData)
            .then((response) => {
                console.log(response.data);
                _("#userMail").innerHTML = `Please check your mail for the verification link sent to <a href='#'>${email}</a>`;
            })
            .catch((err) => {
                console.log(err.response);
            })
    })
}

