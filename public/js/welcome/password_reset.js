const formResetPwd = _(".form-new-pwd");

if (formResetPwd) {
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


