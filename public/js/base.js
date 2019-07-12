const api_link = "https://goalsetterapi.herokuapp.com";
const regForm = _(".signup-form");
const loginForm = _(".signin-form");
// do u see me

function assignLocation(str) {
    location.assign(str);
}

function replaceLocation(str) {
    location.replace(str);
}

function _(str) {
    return document.querySelector(str);
}

function all(str) {
    return document.querySelectorAll(str);
}

function formDataToObject(formData) {
    return new Object(Array.from(formData.entries()).reduce((old, pair) => ({
        ...old, [pair[0]]: pair[1]
    }), {}))
}

// toggle password reveal (&#xf06e;) ==> illuminati 👁
// x - string id of clicked element, y - string id of input[type="password"] 
function showPwd(x, y) {
    if (_(x).classList.contains('active')) {
        _(x).innerHTML = '&#xf070;';
        _(y).type = 'password';
        _(x).classList.remove('active')
    } else {
        _(x).innerHTML = '&#xf06e;';
        _(y).type = 'text';
        _(x).classList.add('active');
    }
}

// 
function handleError(error) {
    if (error.status === 400) {
        // what to do
        $("#myToast").toast('show');
    }
    if (error.status === 401) {
        genericErrorFunction("password");
    }
    if (error.status === 404 || error.status === 422) {
        genericErrorFunction("email");
    }
    if (error.status === 501) {
        // what to do
        $("#myToast").toast('show');
    } 
    if (error.status === 503) {
        // what to do
        $("#myToast").toast('show');
    }
    function genericErrorFunction(data) {
        const errorElem = _(`[data-id='${data}']`);
        const id = errorElem.previousElementSibling.id;
        const inputElem = _(`#${id} input`) || _(`#${id}`);

        if (regForm) {
            errorElem.innerText = error.data[data][0];
        } 
        
        if (loginForm) {
            errorElem.innerText = error.data.data.message;
        }
        
        errorElem.classList.add("invalid");
        inputElem.classList.add("invalid");
        
        inputElem.addEventListener("input", () => {
            errorElem.innerText = errorElem.dataset.label;
            errorElem.classList.remove("invalid");
            inputElem.classList.remove("invalid");
        })
    }
}

// helper function for css to animate label on input field
all(".con-input input").forEach((elem) => {
    elem.addEventListener("blur", e => {
        e.preventDefault();
        
        const parent = elem.parentNode;
        elem.value? parent.classList.add("valid"):parent.classList.remove("valid");
    })
})