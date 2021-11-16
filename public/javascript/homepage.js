function docSignupRoute() {
    document.location.replace("/doc-signup")
};

function docSigninRoute() {
    document.location.replace("/doc-login")
};

function nurSignupRoute() {
    document.location.replace("/nur-signup")
};

function nurSigninRoute() {
    document.location.replace("/nur-login")
};



document.querySelector('#doctor-signin').addEventListener('click', docSigninRoute);
document.querySelector('#nurse-signin').addEventListener('click', nurSigninRoute);
document.querySelector('#doctor-signup').addEventListener('click', docSignupRoute);
document.querySelector('#nurse-signup').addEventListener('click', nurSignupRoute);